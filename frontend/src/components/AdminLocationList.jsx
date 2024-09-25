
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//style
import Select from 'react-select'


// Service
import { locationsList } from "../services/apiAdmin";

export default function AdminLocationList({ adminToken }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const locationsData = await locationsList(adminToken);
        console.log("Locations Data:", locationsData);
        setLocations(locationsData);
        // console.log("loc", locations);
      } catch (error) {
        setErrorMessage("Failed to load locations.");
        console.error("Error fetching locations:", error);
      }
    };
    loadLocations();
  }, [adminToken]); // run whenever adminToken change

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (locations.length === 0) {
    return <div>There are no locations yet.</div>;
  }

  return (
    <div>
      {locations.map((loc) => (
        <div key={loc._id}>
            <img
              src={loc.picture}
              alt={`${loc.name}'s profile`}
              style={{ width: "150px", height: "150px", borderRadius: "75px" }}
            />
          <h2>{loc.name}</h2>
          <p>Address: {loc.address}</p>
          <p>Location: {loc.postal}</p>
          <p>Facilities: {loc.facilities}</p>
        </div>
      ))}
    </div>
  );
}
