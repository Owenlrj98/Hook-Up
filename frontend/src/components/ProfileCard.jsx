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

  return (
    <div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div key={profile._id}>
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
