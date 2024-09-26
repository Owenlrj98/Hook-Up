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
          select: "profile.name profile.picture",
        }) //get sender -> profile -> name -> pic
        .populate({
          path: "recipient",
          select: "profile.name profile.picture",
        }); //get recipient -> profile -> name -> pic
  
      res.status(200).json(acceptedInvites);
    } catch (error) {
      console.error("Error fetching pending invitations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

// cancel appt
router.delete("/:appointmentId", verifyToken, async (req, res) => {
  const appointmentId = req.params.appointmentId;
  try {
    const cancelAppointment = await Invite.findByIdAndDelete(appointmentId);
    if (!cancelAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment canceled" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
  