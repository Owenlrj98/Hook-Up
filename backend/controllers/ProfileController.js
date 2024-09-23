const express = require('express');
const User = require('../models/UserSchema'); // Adjust the path as necessary
const verifyToken = require('../middleware/verifyToken'); // Ensure you have token verification
const router = express.Router();

//aws
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
// Initialize S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Multer-S3 setup
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'hookupimage',
        // acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, `profile_pictures/${Date.now()}_${file.originalname}`);
        }
    })
});

// Middleware to get the current user
const getUser = (req) => {
    return req.user; // Assume the user object is attached by the verifyToken middleware
};
// Stupid me set up two diff routers for picture and profile details when they should be tgt
router.post("/:userId/details", verifyToken, upload.single('profilePicture'), async (req, res) => {
    const { userId } = req.params;
    const currentUser = getUser(req);

    try {
        // Ensure the current user matches the userId in the params
        if (currentUser._id.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        const user = await User.findById(userId); // Use userId from params

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Get profile details from the request body
        const { name, experience, preferences } = req.body;
        
        // Validate required fields
        if (!name || !experience || !preferences) {
            return res.status(400).json({ error: 'Name, experience, and preferences are required.' });
        }

        // Set or update the profile details
        user.profile = {
            picture: req.file ? req.file.location : user.profile.picture, // Use the uploaded file URL or retain the existing one
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
