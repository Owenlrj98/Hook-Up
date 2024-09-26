import { useState, useEffect } from "react";
//style
import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "/images/hookuplogoz.png";
//services
import { fetchPendingCount } from "../services/apiInvite";

function UserNavBar({ handleLogout, token }) {
  //create badge
  const [pendingCount, setPendingCount] = useState(0);
  useEffect(() => {
    const fetchPendingInvitesCount = async () => {
      try {
        const response = await fetchPendingCount(token);
        setPendingCount(response);
        console.log(pendingCount)
      } catch (error) {
        console.error("Failed to fetch pending invites:", error);
      }
    };
    fetchPendingInvitesCount();
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
            <Nav.Link href="/user/invitations">Invitations</Nav.Link>
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
