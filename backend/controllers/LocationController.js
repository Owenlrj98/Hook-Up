const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

//model
const Location = require("../models/LocationSchema");

// Get all locations on user side
router.get("/", verifyToken, async (req, res) => {
    try {
      const locations = await Location.find()
      res.status(200).json(locations);
      } catch (error) {
          console.error("Error fetching locations:", error);
          res.status(500).json({ error: "Internal server error" });
      }
  });



module.exports = router;