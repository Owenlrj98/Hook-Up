import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//styling
// import Button from 'react-bootstrap/Button';

//services
import { fetchRandomUser } from "../services/apiProfile";

function HomePage({ token, user, setUser }) {
  // const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("my token:", token);
  //   const loadProfile = async () => {
  //     if (!token) {
  //       setError("No token");
  //       return;
  //     }
  //     try {
  //       const profileData = await fetchRandomUser(token);
  //       console.log("Profile data:", profileData);
  //       // setUser(profileData.profile);
  //       if (JSON.stringify(profileData) !== JSON.stringify(user)) {

  //       setUser(profileData);
  //       }
  //     } catch (error) {
  //       setError("Failed to load profile.");
  //       console.error("Error fetching profile:", error);
  //     }
  //   };

  //   loadProfile();
  // }, []);

  // useEffect(() => {
  //   console.log("my token:", token);
  //   const loadProfile = async () => {
  //     if (!token) {
  //       setError("No token");
  //       return;
  //     }
  //     try {
  //       const profileData = await fetchRandomUser(token);
  //       console.log("Profile data:", profileData);
  //       // setUser(profileData.profile);
  //       if (JSON.stringify(profileData) !== JSON.stringify(user)) {

  //       setUser(profileData);
  //       }
  //     } catch (error) {
  //       setError("Failed to load profile.");
  //       console.error("Error fetching profile:", error);
  //     }
  //   };

  //   loadProfile();
  // }, []);

  const handleFetchRandomUser = async () => {
    if (!token) {
      setError("No token");
      return;
    }
    try {
      const profileData = await fetchRandomUser(token);
      console.log("profiledata:", profileData);
      setUser(profileData);
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
      <h1>Hook up with someone!</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user ? (
        <div key={user._id}>
          {user.profile.picture && (
            <img
              src={user.profile.picture}
              alt={`${user.profile.name}'s profile`}
              style={{ width: "150px", height: "150px", borderRadius: "75px" }}
            />
          )}
          <h2>Name: {user.profile.name}</h2>
          <p>Experience: {user.profile.experience}</p>
          <p>Likes: {user.profile.preferences}</p>
          <button onClick={handleFetchRandomUser}>Find Another</button>
          <button onClick={handleHook}>Hook Up</button>
        </div>
      ) : (
        <div>
        <p>Who will you find?</p>
        <button onClick={handleFetchRandomUser}>Find Someone</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
