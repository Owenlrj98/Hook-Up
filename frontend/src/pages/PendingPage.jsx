import { useEffect, useState } from "react";

//services
import { invitationListFrom } from "../services/apiInvite";

function PendingPage({ token }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const loadInvitations = async () => {
      try {
        // get all pending invitations
        const invitationData = await invitationListFrom(token);
        setInvitations(invitationData);
        console.log("Invitations Data:", invitationData);
      } catch (error) {
        setErrorMessage("Failed to load invitations.");
        console.error("Error fetching invitations:", error);
      }
    };

    loadInvitations();
  }, [token]);

//   console.log("invite", invitations);

  const handleAccept = async (invitationId) => {
    //change invitation status from pending to approve
    try {
      await updateInvitationStatus(token, invitationId, "accepted");
      setInvitations(prevInvitations =>
        prevInvitations.filter(invitation => invitation._id !== invitationId)
      );
    } catch (error) {
      setErrorMessage("Failed to accept invitation.");
      console.error("Error accepting invitation:", error);
    }
  }
  if (!invitations) {
    return <div>You have no invitations yet</div>;
  }
  return (
    <div>
      {invitations.length === 0 ? (
        <p>No invitations</p>
      ) : (
        invitations.map((invitation) => (
          <div key={invitation._id}>
            <h2>Invitation from: {invitation.sender.profile.name}</h2>
            <p>Date: {invitation.date}</p>
            <p>Time: {invitation.time}</p>
            <p>Location: {invitation.location}</p>
            <p>Activity: {invitation.activity}</p>
            <p>Status: {invitation.status}</p>
            <button>Sure!</button>
            <button>Nope!</button>
          </div>
        ))
      )}
    </div>
  );
}

export default PendingPage;
