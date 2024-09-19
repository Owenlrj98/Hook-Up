import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

//api
import { userSignUp } from "../services/apiUsers";

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    // name: "",
    // experience: "",
    // preferences: [""],
  });
  const [successMessage, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await userSignUp(formData);
      setSuccess("Sign Up Successful!");
      setError("");
      console.log("Token:", token);
      navigate("/user/login");
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };
  return (
    <div className="user-bg">
      <Container className="signup-container">
        <h3 className="h3-custom">Sign Up</h3>
        <Form
          onSubmit={handleSubmit}
          className="formLabel mt-4 pages-box-shadow p-3"
        >
          <h4>Create your account</h4>
          <Form.Group controlId="formUsername" className="mt-3">
            <Form.Label>Create Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Create your username"
              value={formData.username}
              name="username"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Create Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Create a password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="button-container mt-3">
            <Button type="submit" className="custom-button-primary">
              Sign Up
            </Button>
            {error && <p className="error mt-3">{error}</p>}
            {successMessage && <p className="success mt-3">{successMessage}</p>}
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default SignUpPage;
