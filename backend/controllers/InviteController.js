const express = require('express');
const Invite = require('../models/InviteSchema'); // Adjust the path as necessary
const verifyToken = require('../middleware/verifyToken'); // Ensure you have token verification
const router = express.Router();

// Middleware to get the current user
const getUser = (req) => {
  return req.user; // Assume the user object is attached by the verifyToken middleware
};

//create invitation
router.post("/:recipientId", verifyToken, async (req, res) => {
  console.log("Incoming request params:", req.params);

  const { date, time, location, activity } = req.body;
  const { recipientId } = req.params;
  const sender = getUser(req)._id;
  // console.log(recipientId);
  try {
    const newInvite = new Invite({
      sender,
      recipient: recipientId,
      date,
      time,
      location,
      activity,
    });

    await newInvite.save();
    res.status(201).json(newInvite);
  } catch (error) {
    console.error("Error creating invitation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//display invitation
router.get("/invites", verifyToken, async (req, res) => {
    const userId = getUser(req)._id;
  
    try {
      const invites = await Invite.find({
        $or: [{ sender: userId }, { recipient: userId }],
      }).populate("sender recipient"); // Populate sender and recipient details
  
      res.status(200).json(invites);
    } catch (error) {
      console.error("Error fetching invitations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
module.exports = router;
