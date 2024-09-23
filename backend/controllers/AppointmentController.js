const express = require("express");
const verifyToken = require("../middleware/verifyToken"); // Ensure you have token verification
const router = express.Router();
//models
const Invite = require("../models/InviteSchema"); // Adjust the path as necessary

const getUser = (req) => {
    return req.user; // Assume the user object is attached by the verifyToken middleware
  };
  
router.get("/", verifyToken, async (req, res) => {
    const userId = getUser(req)._id;
    try {
      const acceptedInvites = await Invite.find({
        // status = accepted & userid = sender OR recipient
        status: "Accepted",
        $or: [
          { sender: userId },
          { recipient: userId }
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
  
      res.status(200).json(acceptedInvites);
    } catch (error) {
      console.error("Error fetching pending invitations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
  