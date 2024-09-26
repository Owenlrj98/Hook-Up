import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

//style
import { Container, Button, Card, Row, Col } from "react-bootstrap";

//services
import { invitationListFrom } from "../services/apiInvite";
import { updateInvitationStatus } from "../services/apiInvite";
import { deleteInvitation } from "../services/apiInvite";

function PendingPage({ token }) {
  const [successMessage, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const loadInvitations = async () => {
      try {
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

  console.log("invite", invitations);

  const handleAccept = async (invitationId) => {
    try {
      await updateInvitationStatus(token, invitationId, "Accepted");
      setInvitations((prevInvitations) =>
        prevInvitations.filter((invitation) => invitation._id !== invitationId),
      ); //filter to remove from list baby
      setSuccess("You accepted the invitation!");
    } catch (error) {
      setErrorMessage("Failed to accept invitation.");
      console.error("Error accepting invitation:", error);
    }
  };

  const handleDecline = async (invitationId) => {
    try {
      await deleteInvitation(token, invitationId);
      setInvitations((prevInvitations) =>
        prevInvitations.filter((invitation) => invitation._id !== invitationId),
      ); //filter to remove from list baby
      setSuccess("You declined the invitation!");
    } catch (error) {
      console.error("Failed to delete invitation:", error.message);
    }
  };

  if (!invitations) {
    return <div>You have no invitations yet</div>;
  }

return (
  <div className="homeContent">
    <Container>
      {invitations.length === 0 ? (
        <p>No invitations</p>
      ) : (
        <Row>
          {invitations.map((invitation) => (
            <Col xs={12} sm={6} md={4} key={invitation._id}>
              <Card className="mb-4">
                <Card.Body>
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src={invitation.sender.profile.picture}
                      alt={`${invitation.sender.profile.name}'s profile`}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "75px",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <h5>Invitation from: {invitation.sender.profile.name}</h5>
                      <p>Date: {format(parseISO(invitation.date), "dd MMMM yyyy")}</p>
                      <p>Time: {invitation.time}</p>
                      <p>Location: {invitation.location}</p>
                      <p>Activity: {invitation.activity}</p>
                      <p>Status: {invitation.status}</p>
                      <Button
                        className="custom-button-primary"
                        onClick={() => handleAccept(invitation._id)}
                      >
                        Sure!
                      </Button>
                      <Button
                        className="custom-button-secondary"
                        onClick={() => handleDecline(invitation._id)}
                      >
                        Nope!
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  </div>
);
}

export default PendingPage;
