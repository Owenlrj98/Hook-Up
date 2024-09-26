import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

//services
import { locationsList } from "../services/apiAdmin";
import { removeGym } from "../services/apiAdmin";

const AdminLocationPage = ({ adminToken }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccess] = useState("");
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const locationsData = await locationsList(adminToken);
        console.log("Locations Data:", locationsData);
        setLocations(locationsData);
        // console.log("loc", locations);
      } catch (error) {
        setErrorMessage("Failed to load locations.");
        console.error("Error fetching locations:", error);
      }
    };
    loadLocations();
  }, [adminToken]); // run whenever adminToken change

  const handleRemove = async (locationId) => {
    try {
      await removeGym(adminToken, locationId);
      setLocations((prevLocations) =>
        prevLocations.filter((location) => location._id !== locationId),
      ); //filter to remove from list baby
      setSuccess("You removed the location!");
    } catch (error) {
      console.error("Failed to delete location:", error.message);
    }
  };


  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (locations.length === 0) {
    return <div>There are no locations yet.</div>;
  }

  return (
    <Container>
      <Row>
        {locations.map((loc) => (
          <Col xs={12} sm={6} md={4} key={loc._id}>
            <Card className="mb-5">
              <Card.Img
                variant="top"
                src={loc.picture}
                alt={`${loc.name}'s profile`}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{loc.name}</Card.Title>
                <Card.Text>Address: {loc.address}</Card.Text>
                <Card.Text>Postal Code: {loc.postal}</Card.Text>
                <Card.Text>Facilities: {loc.facilities.join(", ")}</Card.Text>
                <Button type="submit" className="custom-button-primary" onClick={() => handleRemove(loc._id)}>
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminLocationPage;
