const express = require("express");
const verifyToken = require("../middleware/verifyToken"); // Ensure you have token verification
const router = express.Router();
//models
const Invite = require("../models/InviteSchema"); // Adjust the path as necessary

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

//display all your pending invitations to others only: sender id = me
router.get("/list", verifyToken, async (req, res) => {
  const userId = getUser(req)._id;
  try {
    const pendingInvites = await Invite.find({
      $or: [
        { sender: userId, status: "pending" },
        // { recipient: userId, status: 'pending' }
      ],
    })
      .populate({
        path: "sender",
        select: "profile.name",
      }) //get sender -> profile -> name
      .populate({
        path: "recipient",
        select: "profile.name",
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
      $or: [{ recipient: userId, status: "pending" }],
    })
      .populate({
        path: "sender",
        select: "profile.name",
      }) //get sender -> profile -> name
      .populate({
        path: "recipient",
        select: "profile.name",
      }); //get recipient -> profile -> name

    res.status(200).json(pendingInvitesToMe);
  } catch (error) {
    console.error("Error fetching pending invitations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update invitation status
router.put("/pending/:invitationId", verifyToken, async (req, res) => {
  const invitationId = req.params.id;
  const { status } = req.body;

  // Validate status
  if (!["accepted", "declined"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const invitation = await Invite.findByIdAndUpdate(
      invitationId,
      { status },
      { new: Approved } // Return the updated document
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

module.exports = router;
