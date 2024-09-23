// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Form, Button, Dropdown } from "react-bootstrap";
// //components
// import ProfileCard from "../components/ProfileCard";
// //services
// import { createEditProfile } from "../services/apiProfile";

// const ProfilePage = ({ profile, setProfile, token }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     experience: "",
//     preferences: "",
//   });
//   const [successMessage, setSuccess] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePreferenceSelect = (experience) => {
//     setFormData({
//       ...formData,
//       experience: experience,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await createEditProfile(token, formData);
//       console.log(response);
//       setSuccess("Profile Created!");
//       setErrorMessage("");
//     } catch (error) {
//       setErrorMessage("Failed.");
//       setSuccess("");
//     }
//   };

//   return (
//     <div className="contractor-bg pages-pad">
//       <Container className="pages-custom-container">
//         <h4 className="h3-custom">Profile</h4>
//         <div className="pages-box-shadow p-3 p-projectTracking">
//           <ProfileCard
//             token={token}
//             profile={profile}
//             setProfile={setProfile}
//           />
//         </div>
//       </Container>
//       <Container>
//         <div className="pages-box-shadow p-3 mt-3">
//           <h5 className="h3-custom">Create Profile</h5>
//           <Form onSubmit={handleSubmit} className="formLabel mt-2 p-3">
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 placeholder="Enter your name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="formExperience" className="mt-3">
//               <Form.Label>Your Experience Level </Form.Label>
//               <Dropdown>
//                 <Dropdown.Toggle variant="success" id="dropdown-basic">
//                   {formData.experience || "Select Preference"}
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                   <Dropdown.Item
//                     onClick={() => handlePreferenceSelect("Beginner")}
//                   >
//                     Beginner
//                   </Dropdown.Item>
//                   <Dropdown.Item
//                     onClick={() => handlePreferenceSelect("Intermediate")}
//                   >
//                     Intermediate
//                   </Dropdown.Item>
//                   <Dropdown.Item
//                     onClick={() => handlePreferenceSelect("Advanced")}
//                   >
//                     Advanced
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             </Form.Group>

//             <Form.Group controlId="formPreferences" className="mt-3">
//               <Form.Label>Preference</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="preferences"
//                 placeholder="Enter your preferences"
//                 value={formData.preferences}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <div className="button-container mt-3">
//               <Button type="submit" className="custom-button-primary">
//                 Create
//               </Button>
//               {errorMessage && <p className="error mt-3">{errorMessage}</p>}
//               {successMessage && (
//                 <p className="success mt-3">{successMessage}</p>
//               )}
//             </div>
//           </Form>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default ProfilePage;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Dropdown } from "react-bootstrap";
// components
import ProfileCard from "../components/ProfileCard";
// services
import { createEditProfile } from "../services/apiProfile";

const ProfilePage = ({ profile, setProfile, token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    preferences: "",
    profilePicture: null, // Add state for the profile picture
  });
  const [successMessage, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePreferenceSelect = (experience) => {
    setFormData({
      ...formData,
      experience: experience,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      profilePicture: event.target.files[0], // Store the selected file
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('experience', formData.experience);
    formDataToSend.append('preferences', formData.preferences);
    if (formData.profilePicture) {
      formDataToSend.append('profilePicture', formData.profilePicture); // Append the file
    }

    try {
      const response = await createEditProfile(token, formDataToSend); // Adjust this function to accept FormData
      console.log(response);
      setSuccess("Profile Created!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed.");
      setSuccess("");
    }
  };

  return (
    <div className="contractor-bg pages-pad">
      <Container className="pages-custom-container">
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
          <Form onSubmit={handleSubmit} className="formLabel mt-2 p-3">
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
              <Form.Label>Your Experience Level </Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {formData.experience || "Select Preference"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handlePreferenceSelect("Beginner")}
                  >
                    Beginner
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handlePreferenceSelect("Intermediate")}
                  >
                    Intermediate
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handlePreferenceSelect("Advanced")}
                  >
                    Advanced
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group controlId="formPreferences" className="mt-3">
              <Form.Label>Preference</Form.Label>
              <Form.Control
                type="text"
                name="preferences"
                placeholder="Enter your preferences"
                value={formData.preferences}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* File Input for Profile Picture */}
            <Form.Group controlId="formProfilePicture" className="mt-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
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

