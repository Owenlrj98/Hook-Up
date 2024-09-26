//style
import { Container, Button } from "react-bootstrap";
import logo from "/images/hookuplogoz.png";
import { Link } from "react-router-dom";
//components
import Navibar from "../components/NaviBar";

function StartPage() {
  return (
    <>
      <div className="startpage">
        <Container className="caption-container text-center">
          <h3 className="margin-top">Welcome to</h3>
          <div className="text-center">
            <img src={logo} alt="Hook Up" />
          </div>
          <Link to="/user/login">
            <Button className="custom-button-primary">Log In</Button>
          </Link>
          <Link to="/user/signup">
            <Button className="custom-button-secondary">Sign Up</Button>
          </Link>
        </Container>
      </div>
    </>
  );
}

export default StartPage;
