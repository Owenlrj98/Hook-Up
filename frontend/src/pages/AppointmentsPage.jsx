import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

//services
import { acceptedInvitations } from "../services/apiAppointment";
function AppointmentsPage({ token }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadInvitations = async () => {
      try {
        // get all pending invitations
        const appointmentsData = await acceptedInvitations(token);
        setAppointments(appointmentsData);
        console.log("Invitations Data:", appointmentsData);
      } catch (error) {
        setErrorMessage("Failed to load invitations.");
        console.error("Error fetching invitations:", error);
      }
    };

    loadInvitations();
  }, [token]);

  console.log("appt", appointments);
  if (!appointments) {
    return <div>You have no appointments yet</div>;
  }
  return (
    <div>
      {appointments.length === 0 ? (
        <p>No invitations</p>
      ) : (
        appointments.map((appt) => (
          <div key={appt._id}>
            <h2>Invitation to: {appt.recipient.profile.name}</h2>
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

export default AppointmentsPage;
