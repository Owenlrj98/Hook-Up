import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
//style
import { Container, Card, Row, Col, Button } from "react-bootstrap"; // Import Card, Row, and Col

//services
import { acceptedInvitations } from "../services/apiAppointment";
import { cancelAppointment } from "../services/apiAppointment";

function AppointmentsPage({ token }) {
  const [successMessage, setSuccess] = useState("");
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

  const handleCancel = async (appointmentId) => {
    try {
      await cancelAppointment(token, appointmentId);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentId),
      ); //filter to remove from list baby
      setSuccess("You canceled the appointment!");
    } catch (error) {
      console.error("Failed to cancel appointment:", error.message);
    }
  };


  console.log("appt", appointments);
  if (!appointments) {
    return <div>You have no appointments yet</div>;
  }
  return (
    <div className="homeContent">
      <Container>
        {appointments.length === 0 ? (
          <p>No appointments</p>
        ) : (
          <Row>
            {appointments.map((appt) => (
              <Col xs={12} sm={6} md={4} key={appt._id}>
                <Card className="mb-4">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      {appt.sender.profile.picture && (
                        <img
                          src={appt.sender.profile.picture}
                          alt={`${appt.sender.profile.name}'s profile`}
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "30px",
                            marginRight: "10px",
                          }}
                        />
                      )}
                      <h5 className="mb-0">Inviter: {appt.sender.profile.name}</h5>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      {appt.recipient.profile.picture && (
                        <img
                          src={appt.recipient.profile.picture}
                          alt={`${appt.recipient.profile.name}'s profile`}
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "30px",
                            marginRight: "10px",
                          }}
                        />
                      )}
                      <h5 className="mb-0">Invitee: {appt.recipient.profile.name}</h5>
                    </div>
                    <p>Date: {format(parseISO(appt.date), "dd MMMM yyyy")}</p>
                    <p>Time: {appt.time}</p>
                    <p>Location: {appt.location}</p>
                    <p>Activity: {appt.activity}</p>
                    <p>Status: {appt.status}</p>
                    <Button className="custom-button-secondary" onClick={() => handleCancel(appt._id)}>Cancel</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default AppointmentsPage;
//     <div className="homeContent">
//       <Container className="text-center">
//       {appointments.length === 0 ? (
//         <p>No appointments</p>
//       ) : (
//         appointments.map((appt) => (
//           <div key={appt._id}>
//             <div key={appt.sender.profile.picture}>
//             {appt.sender.profile.picture && (
//               <img
//                 src={appt.sender.profile.picture}
//                 alt={`${appt.sender.profile.name}'s profile`}
//                 style={{
//                   width: "60px",
//                   height: "60px",
//                   borderRadius: "30px",
//                 }}
//               />
//             )}
//             </div>
//             <p>Inviter: {appt.sender.profile.name}</p>
//             <div key={appt.recipient.profile.picture}>
//             {appt.recipient.profile.picture && (
//               <img
//                 src={appt.recipient.profile.picture}
//                 alt={`${appt.recipient.profile.name}'s profile`}
//                 style={{
//                   width: "60px",
//                   height: "60px",
//                   borderRadius: "30px",
//                 }}
//               />
//             )}
//               </div>
//             <p>Invitee: {appt.recipient.profile.name}</p>
//             <p>Date: {format(parseISO(appt.date), "dd MMMM yyyy")}</p>
//             <p>Time: {appt.time}</p>
//             <p>Location: {appt.location}</p>
//             <p>Activity: {appt.activity}</p>
//             <p>Status: {appt.status}</p>
//           </div>
//         ))
//       )}
//       </Container>
//     </div>
//   );
// }

// export default AppointmentsPage;
