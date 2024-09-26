import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//styling
import { Container, Button, Row, Col } from 'react-bootstrap';

//services
import { fetchRandomUser } from "../services/apiProfile";

function HomePage({ token, user, setUser }) {
  // const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFetchRandomUser = async () => {
    if (!token) {
      setError("No token");
      return;
    }
    try {
      const profileData = await fetchRandomUser(token);
      console.log("profiledata:", profileData);
      setUser(profileData);
      // setUser(profileData.profile); // Update user state with new data
      setError(""); // Clear previous errors
      console.log("user data", user);
    } catch (error) {
      setError("Failed to load random user.");
      console.error("Error fetching random user:", error);
    }
  };

  const handleHook = () => {
    if (user) {
      navigate(`/invite/${user._id}`); // Navigate to the invite form with the user ID
      // user._id here is profile id
    }
  };

return (
  <Container className="text-center" style={{ marginTop: '20px' }}>
    <h1>Hook up with someone!</h1>
    {error && <p style={{ color: "red" }}>{error}</p>}

    <Row className="justify-content-center">
      <Col md={6} className="text-center">
        {user ? (
          <div key={user._id}>
            {user.profile.picture && (
              <img
                src={user.profile.picture}
                alt={`${user.profile.name}'s profile`}
                style={{ width: "300px", height: "300px", borderRadius: "150px" }}
              />
            )}
            <h2>Name: {user.profile.name}</h2>
            <p>Experience: {user.profile.experience}</p>
            <p>Likes: {user.profile.preferences}</p>
            <p>{user.profile.description}</p>
            <Button className="custom-button-primary" onClick={handleFetchRandomUser}>Find Another</Button>
            <Button className="custom-button-secondary" onClick={handleHook}>Hook Up</Button>
          </div>
        ) : (
          <div>
            <p>Who will you find?</p>
            <Button className="custom-button-primary" onClick={handleFetchRandomUser}>Find Someone</Button>
          </div>
        )}
      </Col>
    </Row>
  </Container>
);
}

export default HomePage;
