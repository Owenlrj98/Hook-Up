import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
//style
import { Container, Card, Row, Col, Button } from "react-bootstrap"; 

//services
import { invitationListTo } from "../services/apiInvite";

function InvitationsPage({ token }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const loadInvitations = async () => {
      try {
        // get all pending invitations
        const invitationData = await invitationListTo(token);
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
      <Container>
        {invitations.length === 0 ? (
          <p>No invitations</p>
        ) : (
          <Row>
            {invitations.map((invitation) => (
              <Col xs={12} sm={6} md={4} key={invitation._id}> {/* 3 columns on medium screens */}
                <Card className="mb-4">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <img
                        src={invitation.recipient.profile.picture}
                        alt={`${invitation.recipient.profile.name}'s profile`}
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "75px",
                          marginRight: "10px",
                        }}
                      />
                      <div>
                        <h5>Invitation to: {invitation.recipient.profile.name}</h5>
                        <p>Date: {format(parseISO(invitation.date), 'dd MMMM yyyy')}</p>
                        <p>Time: {invitation.time}</p>
                        <p>Location: {invitation.location}</p>
                        <p>Activity: {invitation.activity}</p>
                        <p>Status: {invitation.status}</p>
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

export default InvitationsPage;
