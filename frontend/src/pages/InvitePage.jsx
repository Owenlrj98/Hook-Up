import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Import Bootstrap components
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { Container, Button } from "react-bootstrap";
//services
import { createInvite } from "../services/apiInvite"; // Adjust imports as necessary
import { fetchLocations } from "../services/apiLocation";

const InvitePage = ({ token }) => {
  const { recipientId } = useParams();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    activity: [],
  });
  const [locations, setLocations] = useState([]); // State for locations
  const [successMessage, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getLocations = async () => {
      try {
        const locationData = await fetchLocations(token); // Fetch locations from the database
        setLocations(locationData);
      } catch (error) {
        setErrorMessage("Failed to load locations.");
      }
    };

    getLocations();
  }, [token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleActivityChange = (selectedOptions) => {
    const selectedActivities = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({
      ...prev,
      activity: selectedActivities,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inviteData = {
      date: new Date(formData.date),
      time: formData.time,
      location: formData.location,
      activity: formData.activity,
    };

    try {
      await createInvite(token, recipientId, inviteData);
      setSuccess("Invitation sent successfully!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to send invitation.");
      setSuccess("");
    }
  };

  //set today dat
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <Container className="login-container">
        <h2>Send an Invitation</h2>
        <Form onSubmit={handleSubmit} className="mt-4">
          <Form.Group controlId="formDate">
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={today}
            />
          </Form.Group>

          <Form.Group controlId="formTime">
            <Form.Label>Time:</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLocation">
            <Form.Label>Location:</Form.Label>
            <Form.Control
              as="select"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="">Select a location</option>
              {locations.map((location) => (
                <option key={location._id} value={location.name}>
                  {location.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formActivity" className="mt-3">
            <Form.Label>Activity</Form.Label>
            <Select
              isMulti
              options={[
                { value: "Top Rope", label: "Top Rope" },
                { value: "Lead Climbing", label: "Lead Climbing" },
                { value: "Bouldering", label: "Bouldering" },
              ]}
              onChange={handleActivityChange}
              placeholder="Select Preferences"
              value={formData.activity.map((activity) => ({
                value: activity,
                label: activity,
              }))}
            />
          </Form.Group>

          <Button type="submit" className="custom-button-secondary me-2">
            Send Invitation
          </Button>
        </Form>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </Container>
    </div>
  );
};

export default InvitePage;
