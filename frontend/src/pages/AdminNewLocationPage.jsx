// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Form, Button, Dropdown } from "react-bootstrap";
// //service
// import { createLocation } from "../services/apiAdmin";

// const AdminNewLocationPage = ({ adminToken }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     postal: "",
//     facilities: "",
//   });
//   const [locationPicture, setLocationPicture] = useState(null); // New state for the location picture
//   const [successMessage, setSuccess] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (event) => {
//     setLocationPicture(event.target.files[0]); // Update state with the selected file
//   };

//   const handleFacilitiesSelect = (facilities) => {
//     setFormData({
//       ...formData,
//       facilities: facilities,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formDataToSend = new FormData(); // Use FormData to handle file upload

//     // Append text fields to FormData
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("address", formData.address);
//     formDataToSend.append("postal", formData.postal);
//     formDataToSend.append("facilities", formData.facilities);

//     // Append file to FormData
//     if (locationPicture) {
//       formDataToSend.append("locationPicture", locationPicture);
//     }

//     try {
//       const response = await createLocation(adminToken, formDataToSend);
//       console.log(response);
//       setSuccess("Location Created!");
//       setErrorMessage("");
//     } catch (error) {
//       setErrorMessage("Failed.");
//       setSuccess("");
//     }
//   };

//   //styling
//   const options = [
//     { value: "Bouldering Wall", label: "Bouldering Wall" },
//     { value: "Top Rope Wall", label: "Top Rope Wall" },
//     { value: "Lead Climbing Wall", label: "Lead Climbing Wall" },
//     { value: "System Board", label: "System Board" }
// ];
// const YourComponent = ({ formData, setFormData }) => {
//   const handleFacilitiesChange = (selectedOptions) => {
//       // Convert selected options to an array of values
//       const facilities = selectedOptions.map(option => option.value);
//       // Update form data with the selected facilities
//       setFormData({ ...formData, facilities });
//   };


//   return (
//     <div className="contractor-bg pages-pad">
//       <Container className="pages-custom-container">
//         <h4 className="h3-custom">Location</h4>
//       </Container>
//       <Container>
//         <div className="pages-box-shadow p-3 mt-3">
//           <h5 className="h3-custom">Add New Location</h5>
//           <Form onSubmit={handleSubmit} className="formLabel mt-2 p-3">
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 placeholder="Enter gym name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formAddress">
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 type="address"
//                 name="address"
//                 placeholder="Enter address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formPostal" className="mt-3">
//               <Form.Label>Postal Code</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="postal"
//                 placeholder="Enter postal code"
//                 value={formData.postal}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formFacilities" className="mt-3">
//             <Form.Label>Facilities</Form.Label>
//             <Select
//                 isMulti
//                 options={options}
//                 onChange={handleFacilitiesChange}
//                 placeholder="Select Preferences"
//                 value={options.filter(option => formData.facilities?.includes(option.value))}
//             />
//         </Form.Group>

//             {/* File Upload Input */}
//             <Form.Group controlId="formLocationPicture" className="mt-3">
//               <Form.Label>Location Picture</Form.Label>
//               <Form.Control
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
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

// export default AdminNewLocationPage;

import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Select from "react-select"; // Import Select from react-select
import { createLocation } from "../services/apiAdmin";

const AdminNewLocationPage = ({ adminToken }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    postal: "",
    facilities: [],
  });
  const [locationPicture, setLocationPicture] = useState(null);
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
    setLocationPicture(event.target.files[0]);
  };

  const handleFacilitiesChange = (selectedOptions) => {
    const facilities = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData({
      ...formData,
      facilities,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("postal", formData.postal);
    formDataToSend.append("facilities", formData.facilities); // Send as comma-separated or array

    if (locationPicture) {
      formDataToSend.append("locationPicture", locationPicture);
    }

    try {
      const response = await createLocation(adminToken, formDataToSend);
      console.log(response);
      setSuccess("Location Created!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to create location.");
      setSuccess("");
    }
  };
  //for the selectz
  const options = [
    { value: "Bouldering Wall", label: "Bouldering Wall" },
    { value: "Top Rope Wall", label: "Top Rope Wall" },
    { value: "Lead Climbing Wall", label: "Lead Climbing Wall" },
    { value: "System Board", label: "System Board" },
  ];

  return (
    <div className="contractor-bg pages-pad">
      <Container className="pages-custom-container">
        <h4 className="h3-custom">Location</h4>
      </Container>
      <Container>
        <div className="pages-box-shadow p-3 mt-3">
          <h5 className="h3-custom">Add New Location</h5>
          <Form onSubmit={handleSubmit} className="formLabel mt-2 p-3">
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter gym name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPostal" className="mt-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postal"
                placeholder="Enter postal code"
                value={formData.postal}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFacilities" className="mt-3">
              <Form.Label>Facilities</Form.Label>
              <Select
                isMulti
                options={options}
                onChange={handleFacilitiesChange}
                placeholder="Select Preferences"
                value={options.filter(option => formData.facilities.includes(option.value))}
              />
            </Form.Group>
            <Form.Group controlId="formLocationPicture" className="mt-3">
              <Form.Label>Location Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
            <div className="button-container mt-3">
              <Button type="submit" className="custom-button-primary">
                Create
              </Button>
              {errorMessage && <p className="error mt-3">{errorMessage}</p>}
              {successMessage && <p className="success mt-3">{successMessage}</p>}
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default AdminNewLocationPage;
