import { useEffect, useState } from "react";

//services
import { invitationList } from "../services/apiInvite";

function InvitationsPage({ token }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [invitations, setInvitations] = useState("");

  useEffect(() => {
    const loadInvitations = async () => {
      try {
        // get all pending invitations
        const invitationData = await invitationList(token);
        setInvitations(invitationData);
        console.log("Invitations Data:", invitationData);
      } catch (error) {
        setErrorMessage("Failed to load invitations.");
        console.error("Error fetching invitations:", error);
      }
    };

    loadInvitations();
  }, [token]);

  console.log("invite", invitations);
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
            {/* <h2>Invitation to: {invitation.sender.profile.name}</h2> */}
            <h2>Invitation to: {invitation.recipient?.profile?.name || "Unknown Recipient"}</h2>

            <p>Date: {invitation.date}</p>
            <p>Time: {invitation.time}</p>
            <p>Location: {invitation.location}</p>
            <p>Activity: {invitation.activity}</p>
            <p>Status: {invitation.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default InvitationsPage;
