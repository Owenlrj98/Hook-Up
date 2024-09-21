import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

//api
import { userLogin } from "../services/apiUsers";

function LoginPage({ setToken, setIsUserLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const token = await userLogin({ username, password });
      console.log(token);
      setToken(token);
      setIsUserLoggedIn(true);
      setSuccessMessage("Login Successful");
      localStorage.setItem('jwt token', token); //store token in localstorage upon log in
      navigate("/user");
    } catch (error) {
      console.log(error);
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="user-bg">
      <Container className="login-container">
        <h3 className="h3-custom ">Login</h3>
        <Form onSubmit={handleLogin} className="formLabel mt-4">
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="mt-3 custom-button-primary">
            Login
          </Button>
          {error && <p className="error mt-3">{error}</p>}
          {successMessage && <p className="success mt-3">{successMessage}</p>}
        </Form>

        <div className="button-container mt-2">
          <Link to="/contractor/signup">
            <Button className="custom-button-primary me-2">Sign Up</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
