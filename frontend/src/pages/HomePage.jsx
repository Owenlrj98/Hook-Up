import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//services
import { fetchRandomUser } from "../services/apiProfile";

function HomePage({ token, user, setUser }) {
  // const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("my token:", token);
    const loadProfile = async () => {
      if (!token) {
        setError("No token");
        return;
      }
      try {
        const profileData = await fetchRandomUser(token);
        console.log("Profile data:", profileData);
        // setUser(profileData.profile);
        setUser(profileData)
      } catch (error) {
        setError("Failed to load profile.");
        console.error("Error fetching profile:", error);
      }
    };

    loadProfile();
  }, [token]);

  const handleFetchRandomUser = async () => {
    if (!token) {
      setError("No token");
      return;
    }
    try {
      const profileData = await fetchRandomUser(token);
      console.log(profileData);
      setUser(profileData)
      // setUser(profileData.profile); // Update user state with new data
      setError(""); // Clear previous errors
      console.log("user data", user);
    } catch (error) {
      setError("Failed to load random user.");
      console.error("Error fetching random user:", error);
    }
  };

  const handleHook = () => {
    if (user) {
      navigate(`/invite/${user._id}`); // Navigate to the invite form with the user ID
    // user._id here is profile id 
    }
  };

  return (
    <div>
      <h1>Hook with someone!</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user ? (
        <div>
          <h2>Name: {user.profile.name}</h2>
          <p>Experience: {user.profile.experience}</p>
          <p>Likes: {user.profile.preferences}</p>
          {/* Add more user fields as necessary */}
          <button onClick={handleFetchRandomUser}>Get Random User</button>
            <button onClick={handleHook}>Hook</button>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}

export default HomePage;
