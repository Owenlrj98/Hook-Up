// import { useState, useEffect } from "react";
// //services
// import { fetchUserCount } from "../services/apiAdmin";

// function AdminHomePage(adminToken) {
//   const [userCount, setUserCount] = useState();

//   useEffect(() => {
//     fetchUserCount();
//     const totalUserCount = async () => {
//       try {
//         const response = await fetchUserCount(adminToken);
//         setUserCount(response);
//       } catch (error) {
//         console.error("Failed to fetch user:", error);
//       }
//     };
//     totalUserCount();
//   }, [adminToken]);

//   return <div>"Total Number of Users:" {userCount}</div>;
// }

// export default AdminHomePage;

import { useState, useEffect } from "react";
// services
import { fetchUserCount } from "../services/apiAdmin";

function AdminHomePage({ adminToken }) {
  const [userCount, setUserCount] = useState(null); 

  useEffect(() => {
    const totalUserCount = async () => {
      try {
        const response = await fetchUserCount(adminToken);
        setUserCount(response);
      } catch (error) {
        console.error("Failed to fetch user count:", error);
      }
    };

    totalUserCount(); 
  }, [adminToken]);

  return (
    <div className="text-center">
      <h1>Number of people using your app:</h1>
      <h2>{userCount}</h2>
    </div>
  );
}

export default AdminHomePage;

