// import { useState, useEffect } from "react";
// //services
// import { fetchRandomUser } from "../services/apiGetProfile";

// export default function GetProfile({ token }) {
//     const [successMessage, setSuccess] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const [user, setUser] = useState([]);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const loadProfile = async () => {
//             try {
//                 const profileData = await getProfile(token);
//                 console.log("Profile data:", profileData);
//                 } catch (error) {
//                     setError("Failed to load profile.");
//                     console.error("Error fetching profile:", error);
//                 }
//             };

//             loadProfile();
//         }, []);

//         return (
//             <div>
//             <h1>Random User Profile</h1>
//             <button onClick={fetchRandomUser}>Get Random User</button>
      
//             {error && <p style={{ color: 'red' }}>{error}</p>}
      
//             {user && (
//               <div>
//                 <h2>{user.name}</h2>
//                 <p>Email: {user.email}</p>
//                 <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
//                 {/* Add more user fields as necessary */}
//               </div>
//             )}
//           </div>
//         );
//       };