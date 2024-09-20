import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
//components
import Navibar from "../components/NaviBar";

function StartPage() {
  return (
    <>
      <div className="homepage">
        <Container className="caption-container">
          <h3 className="margin-top">Welcome to Hook Up</h3>
          <Link to="/user/login">
            <Button className="custom-button-secondary">Log In</Button>
          </Link>
          <Link to="/user/signup">
            <Button className="customer-button-secondary">Sign Up</Button>
          </Link>
        </Container>
      </div>
    </>
  );
}

export default StartPage;
