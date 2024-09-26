import { useState, useEffect } from "react";
//style
import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "/images/hookuplogoz.png";
//services
import { fetchPendingCount } from "../services/apiInvite";
import { fetchInvitationCount } from "../services/apiInvite";

function UserNavBar({ handleLogout, token }) {
  //create badge
  const [pendingCount, setPendingCount] = useState(0);
  const [inviteCount, setInviteCount] = useState(0);
  useEffect(() => {
    const fetchPendingInvitesCount = async () => {
      try {
        const response = await fetchPendingCount(token);
        setPendingCount(response);
      } catch (error) {
        console.error("Failed to fetch pending invites:", error);
      }
    };
    fetchPendingInvitesCount();
    const fetchInvitesCount = async () => {
      try {
        const response = await fetchInvitationCount(token);
        setInviteCount(response);
      } catch (error) {
        console.error("Failed to fetch invites:", error);
      }
    };
    fetchInvitesCount();
  }, [token]);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/user">
            <img className="image" src={logo}></img>
            Home
          </Navbar.Brand>
          <Nav className="text-center">
            <Nav.Link href="/user/profile">Profile</Nav.Link>
            <Nav.Link href="/user/invitations">
              Invitations
              {inviteCount > 0 && (
                <Badge bg="warning" text="light" className="ms-1">
                  {inviteCount}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link href="/user/pending">
              Pending
              {pendingCount > 0 && (
                <Badge bg="warning" text="light" className="ms-1">
                  {pendingCount}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link href="/user/appointments">Appointments</Nav.Link>
            <Nav.Link href="/user/gyms">Gyms</Nav.Link>
            <Nav.Link href="/" onClick={handleLogout}>
              Log Out
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default UserNavBar;
