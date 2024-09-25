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
      </div>
      {successMessage && <p className="success mt-3">{successMessage}</p>}
    </div>
  );
}
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// // Services
// import { fetchOwnProfile } from "../services/apiProfile";

// export default function ProfileCard({ token }) {
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

//   // If there's no profile, do not render the ProfileCard
//   if (!profile) {
//     return (
//       <div>
//         {errorMessage && <p className="error">{errorMessage}</p>}
//         <p>No profile found. Please create a profile.</p>
//         <Link to="/user/profile/create">
//           <button className="btn btn-primary">Create Profile</button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div key={profile._id}>
//         {profile.picture && (
//           <img
//             src={profile.picture}
//             alt={`${profile.name}'s profile`}
//             style={{ width: "150px", height: "150px", borderRadius: "75px" }}
//           />
//         )}
//         <h2>Name: {profile.name}</h2>
//         <p>Experience: {profile.experience}</p>
//         <p>Likes: {profile.preferences.join(", ")}</p>
//       </div>
//       <Link to="/user/profile/edit">
//         <button className="btn btn-primary mt-3">Edit Profile</button>
//       </Link>
//     </div>
//   );
// }
