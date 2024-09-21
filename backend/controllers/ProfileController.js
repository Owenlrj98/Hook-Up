const express = require('express');
const User = require('../models/UserSchema'); // Adjust the path as necessary
const verifyToken = require('../middleware/verifyToken'); // Ensure you have token verification
const router = express.Router();

// Middleware to get the current user
const getUser = (req) => {
    return req.user; // Assume the user object is attached by the verifyToken middleware
};

// Create user profile details
router.post("/:userId/details", verifyToken, async (req, res) => {
    const { userId } = req.params;
    const currentUser = getUser(req);

    try {
        // Ensure the current user matches the userId in the params
        if (currentUser._id.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        // Find the user profile
        const user = await User.findById(userId); // Use userId from params

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create or update the profile details
        const { picture, name, experience, preferences } = req.body;

        // Validate required fields
        if (!name || !experience || !preferences) {
            return res.status(400).json({ error: 'Name, experience, and preferences are required.' });
        }

        // Set or update the profile details
        user.profile = {
            picture,
            name,
            experience,
            preferences,
        };

        // Save the updated user
        await user.save();

        // Respond with the updated profile details
        res.status(200).json(user.profile);
    } catch (error) {
        console.error("Error adding/updating profile details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//edit profile
router.put("/:userId/details/edit", verifyToken, async (req, res) => {
    const { userId } = req.params;
    const currentUser = getUser(req);

    try {
        // Ensure the current user matches the userId in the params
        if (currentUser._id.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        // Destructure the profile fields from the request body
        const { picture, name, experience, preferences } = req.body;

        // Validate required fields
        if (!name || !experience || !preferences) {
            return res.status(400).json({ error: 'Name, experience, and preferences are required.' });
        }

        // Update the user profile using findByIdAndUpdate
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                profile: {
                    picture,
                    name,
                    experience,
                    preferences,
                }
            },
            { new: true, runValidators: true } // new: return the updated document, runValidators: ensure validation
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Respond with the updated profile details
        res.status(200).json(updatedUser.profile);
    } catch (error) {
        console.error("Error adding/updating profile details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
