// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Card, Image } from 'react-bootstrap';

// //services
// import { fetchOwnProfile } from "../services/apiProfile";

// export default function ProfileCard({ token }) {
//   const [successMessage, setSuccess] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const profileData = await fetchOwnProfile(token);
//         setProfile(profileData.userProfile.profile);
//         console.log("Profile Data:", profileData);
//       } catch (error) {
//         setErrorMessage("Failed to load profile.");
//         console.error("Error fetching profile:", error);
//       }
//     };

//     loadProfile();
//   }, [token]);

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   return (
//       <Card className="text-center">
//         {profile.profilePicture ? (
//           <Image
//           src={profile.profilePicture}
//           roundedCircle
//           fluid
//           style={{ width: '150px', height: '150px' }}
//           />
//         ) : (
//         <Image
//           src="/default-profile.png" // Placeholder image
//           roundedCircle
//           fluid
//           style={{ width: '150px', height: '150px' }}
//         />
//       )}
//       <Card.Body>
//         {errorMessage && <p className="error">{errorMessage}</p>}
//         <Card.Title>Name: {profile.name}</Card.Title>
//         <Card.Text>
//           <strong>Experience:</strong> {profile.experience || "N/A"}
//         </Card.Text>
//         <Card.Text>
//           <strong>Likes:</strong> {profile.preferences.join(", ") || "N/A"}
//         </Card.Text>
//         <div className="button-container mt-3 mb-5">
//           <Link to={`/projectdetails/edit/${profile._id}`}>
//             <button className="custom-button-primary">Edit</button>
//           </Link>
//         </div>
//         {successMessage && <p className="success mt-3">{successMessage}</p>}
//       </Card.Body>
//     </Card>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//services
import { fetchOwnProfile } from "../services/apiProfile";

export default function ProfileCard({ token }) {
  const [successMessage, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchOwnProfile(token);
        setProfile(profileData.userProfile.profile);
        console.log("Profile Data:", profileData);
      } catch (error) {
        setErrorMessage("Failed to load profile.");
        console.error("Error fetching profile:", error);
      }
    };

    loadProfile();
  }, [token]);

  if (!profile) {
    return <div>Loading...</div>;
  }
  console.log(profile.picture);

  return (
    <div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div key={profile._id}>
        {profile.picture && (
          <img
            src={profile.picture}
            alt={`${profile.name}'s profile`}
            style={{ width: "150px", height: "150px", borderRadius: "75px" }}
          />
        )}
        <h2>Name: {profile.name}</h2>
        <p>Experience: {profile.experience}</p>
        <p>Likes: {profile.preferences.join(", ")}</p>
        <div className="button-container mt-3 mb-5">
          <Link to={`/projectdetails/edit/${profile._id}`}>
            <button className="custom-button-primary">Edit</button>
          </Link>
        </div>
      </div>
      {successMessage && <p className="success mt-3">{successMessage}</p>}
    </div>
  );
}
