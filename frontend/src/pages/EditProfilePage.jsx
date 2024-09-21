// import { useEffect, useState } from "react";
// import { Container, Form, Button } from "react-bootstrap";

// //services
// import { fetchOwnProfile } from "../services/apiGetProfile";

// function ProfilePage({ token, setToken }) {
//   const [successMessage, setSuccess] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     profilePic: "",
//     name: "",
//     experience: "",
//     preferences: [],
//   });

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const profile = await fetchOwnProfile(token);
//       console.log("Profile:", profile);
//       setFormData({
//         profilePic: profile.picture || "",
//         name: profile.name || "",
//         experience: profile.experience || "",
//         preferences: profile.preferences || [],
//       });
//       setSuccess("Profile loaded successfully!");
//     } catch (error) {
//       setError("Failed to load projects.");
//       console.error("Error fetching projects:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });

// return (
//   <Container>
//   <Form onSubmit={handleSubmit}>
//     <Form.Group controlId="formName">
//       <Form.Label>Name</Form.Label>
//       <Form.Control
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Name"
//       />
//     </Form.Group>
    
//     <Form.Group controlId="formExperienceLevel">
//       <Form.Label>Experience Level</Form.Label>
//       <Form.Control
//         as="select"
//         name="experience"
//         value={formData.experience}
//         onChange={handleChange}
//       >
//         <option value="">Select Experience Level</option>
//         <option value="Beginner">Beginner</option>
//         <option value="Intermediate">Intermediate</option>
//         <option value="Advanced">Advanced</option>
//       </Form.Control>
//     </Form.Group>

//     <Form.Group controlId="formPreferences">
//       <Form.Label>Preferences (comma separated)</Form.Label>
//       <Form.Control
//         type="text"
//         name="preferences"
//         value={formData.preferences.join(", ")}
//         onChange={(e) =>
//           setFormData({ ...formData, preferences: e.target.value.split(", ") })
//         }
//         placeholder="Preferences"
//       />
//     </Form.Group>

//     <Button variant="primary" type="submit">
//       Load Profile
//     </Button>

//     {successMessage && <div className="alert alert-success">{successMessage}</div>}
//     {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
//   </Form>
// </Container>
//   );
// };
// };

// export default ProfilePage;
