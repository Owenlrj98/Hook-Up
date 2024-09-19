import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

function UserNavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/user">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/user/profile">Profile</Nav.Link>
            <Nav.Link href="/user/invitations">Invitations</Nav.Link>
            <Nav.Link href="/user/appointments">Appointments</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default UserNavBar;
