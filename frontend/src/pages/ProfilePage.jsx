import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//style
import { Container, Form, Button, Dropdown } from "react-bootstrap";
import Select from "react-select"
//components
import ProfileCard from "../components/ProfileCard";
//service
import { createEditProfile } from "../services/apiProfile"; // Assuming this function is modified to handle file uploads

const ProfilePage = ({ profile, setProfile, token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    preferences: [],
    description: "",
  });
  const [profilePicture, setProfilePicture] = useState(null); // New state for the profile picture
  const [successMessage, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]); // Update state with the selected file
  };

  const handleExperienceSelect = (experience) => {
    setFormData({
      ...formData,
      experience: experience,
    });
  };

    const handlePreferencesChange = (selectedOptions) => {
    const preferences = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      preferences,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData(); // Use FormData to handle file upload

    // Append text fields to FormData
    formDataToSend.append("name", formData.name);
    formDataToSend.append("experience", formData.experience);
  // Append preferences to FormData
  formData.preferences.forEach(preference => {
    formDataToSend.append("preferences[]", preference); // means treat as array
  });
    formDataToSend.append("description", formData.description);

    // Append file to FormData
    if (profilePicture) {
      formDataToSend.append("profilePicture", profilePicture);
    }

    try {
      const response = await createEditProfile(token, formDataToSend);
      console.log(response);
      setSuccess("Profile Created!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed.");
      setSuccess("");
    }
  };
  return (
    <div className="homeContent">
      <Container className="text-center">
        <h4 className="h3-custom">Profile</h4>
        <div className="pages-box-shadow p-3 p-projectTracking">
          <ProfileCard
            token={token}
            profile={profile}
            setProfile={setProfile}
          />
        </div>
      </Container>
      <Container>
        <div className="pages-box-shadow p-3 mt-3">
          <h5 className="h3-custom">Create Profile</h5>
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formExperience" className="mt-3">
              <Form.Label>Your Experience Level</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {formData.experience || "Select Preference"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleExperienceSelect("Beginner")}
                  >
                    Beginner
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleExperienceSelect("Intermediate")}
                  >
                    Intermediate
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleExperienceSelect("Advanced")}
                  >
                    Advanced
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group controlId="formPreferences" className="mt-3">
               <Form.Label>Preferences</Form.Label>
               <Select
                isMulti
                options={[
                  { value: "Bouldering", label: "Bouldering" },
                  { value: "Top Rope", label: "Top Rope" },
                  { value: "Lead Climbing", label: "Lead Climbing" },
                ]}
                onChange={handlePreferencesChange}
                placeholder="Select Preferences"
                value={formData.preferences.map((preference) => ({
                  value: preference,
                  label: preference,
                }))}
              />
            </Form.Group>

            {/* File Upload Input */}
            <Form.Group controlId="formProfilePicture" className="mt-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Write something about yourself"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="button-container mt-3">
              <Button type="submit" className="custom-button-primary">
                Create
              </Button>
              {errorMessage && <p className="error mt-3">{errorMessage}</p>}
              {successMessage && (
                <p className="success mt-3">{successMessage}</p>
              )}
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;

