import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

function AdminNavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/admin">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/admin/list">All Users</Nav.Link>
            <Nav.Link href="/admin/search">Search</Nav.Link>
            <Nav.Link href="/admin/banlist">Banned Users</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default AdminNavBar;
