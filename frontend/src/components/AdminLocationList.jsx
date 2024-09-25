import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//service
import { locationsList } from "../services/apiAdmin";

export default function AdminLocationList({ adminToken }) {
  const [successMessage, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const locationsData = await locationsList(adminToken);
        setLocations(locationsData);
        console.log("Locations Data:", locationsData);
      } catch (error) {
        setErrorMessage("Failed to load locations.");
        console.error("Error fetching locations:", error);
      }
    };

    loadLocations();
  }, [adminToken]);
  console.log("ad", adminToken)
  console.log("locations", locations);
  if (!locations) {
    return <div>There are no locations yet</div>;
  }
  return (
    <div>
      {locations.length === 0 ? (
        <p>No locations</p>
      ) : (
        locations.map((location) => (
          <div key={location._id}>
            <h2>{location.name}</h2>
            <p>Address: {location.address}</p>
            <p>Location: {location.postal}</p>
          </div>
        ))
      )}
    </div>
  );
}
