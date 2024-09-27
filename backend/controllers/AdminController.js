const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyAdminToken = require("../middleware/verifyAdminToken");

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
            cb(null, `gym_pictures/${Date.now()}_${file.originalname}`);
        }
    })
});

//models
const Admin = require("../models/AdminSchema");
const Location = require('../models/LocationSchema');
const User = require("../models/UserSchema")

const SALT_LENGTH = 12;

const createJWT = (admin) => {
    const payload = { username: admin.username, _id: admin._id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "1h" };
    return jwt.sign(payload, secret, options);
  };

// Sign up
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        const adminInDatabase = await Admin.findOne({username});
        if (adminInDatabase) {
            return res.status(400).json({ error: "Username Taken."});
        }

        const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);
        const newAdmin = await Admin.create({ username, password: hashedPassword });
        const adminToken = createJWT(newAdmin);
        res.status(201).json({newAdmin, adminToken});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// log in
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ username });
        if (!existingAdmin) {
            return res.status(401).json({ error: "Invalid Username & Password"});
        }

        const match = await bcrypt.compare(password, existingAdmin.password);
        if (match) {
            const adminToken = createJWT(existingAdmin);
            return res.status(200).json({ adminToken });
        }
        res.status(401).json({ error: "Invalid Username & Password"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// admin create new location
router.post("/location", verifyAdminToken, upload.single('locationPicture'), async (req, res) => {
    const { name, address, postal, facilities } = req.body;
    if (!name || !address || !postal) {
        return res.status(400).json({ error: "Al    l fields are required" });
    }
    try {
        const picture = req.file ? req.file.location : null; // Use req.file.location for S3 fk this
        // console.log("Uploaded picture URL:", picture);

        const newLocation = new Location({
            picture,
            name,
            address,
            postal,
            facilities,
        });
        console.log("Picture path:", picture);

        await newLocation.save();
        res.status(201).json(newLocation);
    } catch (error) {
        console.error("Error creating invitation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// get list of locations
router.get("/location", verifyAdminToken, async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//total users count
router.get("/count", verifyAdminToken, async (req, res) => {  
    try {
      // Count the number of pending invites for the user
      const userCount = await User.countDocuments();
      // Respond with the count
      res.status(200).json({ count: userCount });
    } catch (error) {
      console.error("Error fetching pending invitations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

//delete location
router.delete("/location/:locationId", verifyAdminToken, async (req, res) => {
    const gymId = req.params.locationId;
    try {
      const removeGym = await Location.findByIdAndDelete(gymId);
      if (!removeGym) {
        return res.status(404).json({ error: "Gym not found" });
      }
  
      res.status(200).json({ message: "Gym canceled" });
    } catch (error) {
      console.error("Error deleting gym:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

module.exports = router;


