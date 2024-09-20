const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
require("dotenv").config();

// const { upload } = require('@aws-sdk/lib-storage');

const router = express.Router();

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

// Route for uploading profile pictures
router.post('/upload', upload.single('profilePicture'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileUrl = req.file.location; // S3 file URL
        res.status(200).json({
            message: 'File uploaded successfully',
            fileUrl: fileUrl,
        });
    } catch (error) {
        console.error("upload error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

