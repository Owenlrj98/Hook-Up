const express = require('express');
const User = require('../models/UserSchema'); // Adjust the path as necessary
const verifyAdminToken = require('../middleware/verifyToken'); // Ensure you have token verification
const router = express.Router();

//models
const Location = require('../models/LocationSchema');

// Middleware to get the current user
const getUser = (req) => {
    return req.user; // Assume the user object is attached by the verifyToken middleware
};

router.post("/location", verifyAdminToken, async (req, res) => {
    const { name, address, postal } = req.body;

    try {
        const newLocation = newInvite
    }