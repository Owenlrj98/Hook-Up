const express = require("express");
const verifyToken = require("../middleware/verifyToken"); // Ensure you have token verification
const router = express.Router();

//models
const Invite = require("../models/InviteSchema"); // Adjust the path as necessary
const Location = require("../models/LocationSchema");

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

//display all your pending invitations to others only: sender id = me
router.get("/list", verifyToken, async (req, res) => {
  const userId = getUser(req)._id;
  try {
    const pendingInvites = await Invite.find({
      $or: [{ sender: userId, status: "Pending" }],
    })
      .populate({
        path: "sender",
        select: "profile.name profile.picture",
      }) //get sender -> profile -> name
      .populate({
        path: "recipient",
        select: "profile.name profile.picture",
      }); //get recipient -> profile -> name

    res.status(200).json(pendingInvites);
  } catch (error) {
    console.error("Error fetching pending invitations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//display all pending invitations to yourself: recipientid = me
router.get("/pending", verifyToken, async (req, res) => {
  const userId = getUser(req)._id; // Get the current user's ID

  try {
    const pendingInvitesToMe = await Invite.find({
      $or: [{ recipient: userId, status: "Pending" }],
    })
      .populate({
        path: "sender",
        select: "profile.name profile.picture",
      }) //get sender -> profile -> name -> pic
      .populate({
        path: "recipient",
        select: "profile.name profile.picture",
      }); //get recipient -> profile -> name -> pic

    res.status(200).json(pendingInvitesToMe);
  } catch (error) {
    console.error("Error fetching pending invitations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//edit invitation status when accept
router.put("/pending/:invitationId", verifyToken, async (req, res) => {
  const invitationId = req.params.invitationId;
  const { status } = req.body;

  // Validate status
  if (!["Accepted", "Declined"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const invitation = await Invite.findByIdAndUpdate(
      invitationId,
      { status },
      { new: true }, // Return the updated document
    );

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    res.json(invitation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete invitation when decline
router.delete("/pending/:invitationId", verifyToken, async (req, res) => {
  const invitationId = req.params.invitationId;
  try {
    const deleteInvitation = await Invite.findByIdAndDelete(invitationId);
    if (!deleteInvitation) {
      return res.status(404).json({ error: "Invitation not found" });
    }

    res.status(200).json({ message: "Invitation deleted successfully" });
  } catch (error) {
    console.error("Error deleting invitation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//display all pending counts 
router.get("/pending/count", verifyToken, async (req, res) => {
  const userId = getUser(req)._id; // Get the current user's ID

  try {
    // Count the number of pending invites for the user
    const pendingCount = await Invite.countDocuments({
      recipient: userId,
      status: "Pending",
    });

    // Respond with the count
    res.status(200).json({ count: pendingCount });
  } catch (error) {
    console.error("Error fetching pending invitations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
