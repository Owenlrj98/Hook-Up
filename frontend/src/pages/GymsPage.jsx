import { useEffect, useState } from "react";

//services
import { fetchLocations } from "../services/apiLocation";

const GymsPage = ({ token }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [gyms, setGyms] = useState([]);
  useEffect(() => {
    const loadGyms = async () => {
      try {
        const gymsData = await fetchLocations(token);
        setGyms(gymsData);
      } catch (error) {
        setErrorMessage("Failed to load gyms.");
        console.error("Error fetching gyms:", error);
      }
    };

    loadGyms();
  }, [token]);
  if (!gyms) {
    return <div>No gyms data</div>;
  }
  return (
    <div>
      {gyms.length === 0 ? (
        <p>No invitations</p>
      ) : (
        gyms.map((gym) => (
          <div key={gym._id}>
            <img
              src={gym.picture}
              alt={`${gym.name}'s profile`}
              style={{ width: "100px", height: "100px", borderRadius: "75px" }}
            />
            <h2>{gym.name}</h2>
            <p>Address: {gym.address}</p>
            <p>Postal Code: {gym.postal}</p>
            <p>Facilities: {gym.facilities}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default GymsPage;