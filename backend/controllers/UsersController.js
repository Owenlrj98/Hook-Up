const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

//models
const User = require("../models/UserSchema");

const SALT_LENGTH = 12;

const createJWT = (user) => {
    const payload = { username: user.username, _id: user._id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "1h" };
    return jwt.sign(payload, secret, options);
  };
  
// Sign up
router.post("/signup", async (req, res) => {
    const { username, password, email, name, experience, preferences, isAdmin } = req.body;
    try {
        const userInDatabase = await User.findOne({username});
        if (userInDatabase) {
            return res.status(400).json({ error: "Username Taken."});
        }

        const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);
        const newUser = await User.create({ username, password: hashedPassword, email, name, experience, preferences, isAdmin });
        const token = createJWT(newUser);
        res.status(201).json({newUser, token});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// log in
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(401).json({ error: "Invalid Username & Password"});
        }

        const match = await bcrypt.compare(password, existingUser.password);
        if (match) {
            const token = createJWT(existingUser);
            return res.status(200).json({ token });
        }
        res.status(401).json({ error: "Invalid Username & Password"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get random user in database not equals to the current id
router.get('/', verifyToken, async (req, res) => {
    try {
        // find all users accept your own
      const users = await User.find({ _id: { $ne: req.user._id } });
      // if no users
      if (users.length === 0) {
        return res.status(404).json({ message: 'No other users found' });
      }

      // Select random index in the array of users
    const randomIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomIndex];

    // Respond with the random user profile
    res.json(randomUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get user profile by id
router.get("/:userId", verifyToken, async (req, res) => {
    try {
        if (req.user._id !== req.params.userId) {
            return res.status(401).json({ error: "Unauthorized to enter." })
        }
        const userProfile = await User.findById(req.user._id);
        if (!userProfile) {
            res.status(404);
            throw new Error("Profile Invalid, please try again.");
        }
        res.json({userProfile});
        } catch (error) {
            if (res.statusCode === 404) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    });

// update profile - name, experience and preferences only
// router.put('/:id', verifyToken, async (req, res) => {
//     // Extract user data from request body
//     const { username, experience, preferences } = req.body;

//     // Validate user ID
//     if (req.params.id !== req.user._id.toString()) {
//         return res.status(403).json({ error: 'Unauthorized to update this profile' });
//     }

//     try {
//         // Find and update the user
//         const updatedUser = await User.findByIdAndUpdate(
//             req.params.id, 
//             { username, experience, preferences },
//             { new: true, runValidators: true }
//         );

//         // Check if the user was found and updated
//         if (!updatedUser) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Send updated user as response
//         res.json(updatedUser);
//     } catch (err) {
//         // Log error for debugging purposes
//         console.error('Update profile error:', err);
//         res.status(500).json({ error: err.message });
//     }
// });

module.exports = router;

