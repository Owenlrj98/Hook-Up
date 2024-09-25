const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyAdminToken = require("../middleware/verifyAdminToken");

//models
const Admin = require("../models/AdminSchema");
const Location = require('../models/LocationSchema');

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
router.post("/location", verifyAdminToken, async (req, res) => {
    const { name, address, postal } = req.body;
    if (!name || !address || !postal) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const newLocation = new Location({
            name,
            address,
            postal,
        });
        await newLocation.save();
        res.status(201).json(newLocation);
    } catch (error) {
        console.error("Error creating invitation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//get list of locations
router.get("/location", verifyAdminToken, async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
