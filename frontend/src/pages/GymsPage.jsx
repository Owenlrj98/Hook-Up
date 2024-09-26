import { useEffect, useState } from "react";
//style
import { Container, Card, Row, Col } from "react-bootstrap";
//services
import { fetchLocations } from "../services/apiLocation";

const GymsPage = ({ token }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [gyms, setGyms] = useState([]);
  useEffect(() => {
    const loadGyms = async () => {
      try {
        const gymsData = await fetchLocations(token);
        setGyms(gymsData);
      } catch (error) {
        setErrorMessage("Failed to load gyms.");
        console.error("Error fetching gyms:", error);
      }
    };

    loadGyms();
  }, [token]);
  if (!gyms) {
    return <div>No gyms data</div>;
  }
  return (
    <div className="homeContent">
    <Container>
      {gyms.length === 0 ? (
        <p>No gyms available.</p>
      ) : (
        <Row>
          {gyms.map((gym) => (
            <Col xs={12} sm={6} md={4} key={gym._id}>
              <Card className="mb-5">
                <Card.Img
                  variant="top"
                  src={gym.picture}
                  alt={`${gym.name}'s profile`}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body>
                  <Card.Title>{gym.name}</Card.Title>
                  <Card.Text>
                    <p>Address: {gym.address}</p>
                    <p>Postal Code: {gym.postal}</p>
                    <p>Facilities: {gym.facilities}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  </div>
);
};

export default GymsPage;
