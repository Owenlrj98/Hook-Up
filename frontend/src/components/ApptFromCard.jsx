import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

//services
import { invitationListFrom } from "../services/apiInvite";
import { updateInvitationStatus } from "../services/apiInvite";

function ApptFromCard({ token }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadInvitations = async () => {
      try {
        const appointmentsData = await invitationListFrom(token);
        setAppointments(appointmentsData);
        console.log("Appointments Data:", appointmentsData);
      } catch (error) {
        setErrorMessage("Failed to load appointments.");
        console.error("Error fetching appointments:", error);
      }
    };

    loadInvitations();
  }, [token]);

  console.log("invite", appointments);

  if (!appointments) {
    return <div>You have no appointments yet</div>;
  }

  return (
    <div>
      {appointments.length === 0 ? (
        <p>No appointments</p>
      ) : (
        appointments.map((appt) => (
          <div key={appt._id}>
            <h2>Invitation from: {appt.sender.profile.name}</h2>
            <p>Date: {format(parseISO(appt.date), 'dd MMMM yyyy')}</p>
            <p>Time: {appt.time}</p>
            <p>Location: {appt.location}</p>
            <p>Activity: {appt.activity}</p>
            <p>Status: {appt.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ApptFromCard;
