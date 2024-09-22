import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//services
import { createInvite } from "../services/apiInvite";

const InvitePage = ({ token }) => {
  const { recipientId } = useParams();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    activity: [],
  });
  const [successMessage, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleActivityChange = (event) => {
    const value = event.target.value;
    setFormData((prev) => {
      // Toggle activity selection
      const updatedActivities = prev.activity.includes(value)
        ? prev.activity.filter((activity) => activity !== value)
        : [...prev.activity, value];

      return { ...prev, activity: updatedActivities };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inviteData = {
      // recipient: recipientId,
      date: new Date(formData.date), // Ensure date is in correct format
      time: formData.time,
      location: formData.location,
      activity: formData.activity,
    };

    try {
      await createInvite(token, recipientId, inviteData);
      setSuccess("Invitation sent successfully!");
      setErrorMessage("");
      // navigate("/user"); // Redirect to home or another page
    } catch (error) {
      setErrorMessage("Failed to send invitation.");
      setSuccess("");
    }
  };

  return (
    <div>
      <h2>Send an Invitation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Activity:</label>
          <select
            name="activity"
            value={formData.activity}
            onChange={handleActivityChange}
            multiple
            required
          >
            <option value="Top Rope">Top Rope</option>
            <option value="Lead Climbing">Lead Climbing</option>
            <option value="Bouldering">Bouldering</option>
            <option value="Outdoor Climbing">Outdoor Climbing</option>
          </select>
        </div>
        <button type="submit">Send Invitation</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default InvitePage;
