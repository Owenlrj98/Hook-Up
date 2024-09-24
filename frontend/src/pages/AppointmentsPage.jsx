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
        // get all accepted appointments
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
        <p>No appointments</p>
      ) : (
        appointments.map((appt) => (
          <div key={appt._id}>
            <div key={appt.sender.profile.picture}>
            {appt.sender.profile.picture && (
              <img
                src={appt.sender.profile.picture}
                alt={`${appt.sender.profile.name}'s profile`}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "30px",
                }}
              />
            )}
            </div>
            <p>Inviter: {appt.sender.profile.name}</p>
            <div key={appt.recipient.profile.picture}>
            {appt.recipient.profile.picture && (
              <img
                src={appt.recipient.profile.picture}
                alt={`${appt.recipient.profile.name}'s profile`}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "30px",
                }}
              />
            )}
              </div>
            <p>Invitee: {appt.recipient.profile.name}</p>
            <p>Date: {format(parseISO(appt.date), "dd MMMM yyyy")}</p>
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
