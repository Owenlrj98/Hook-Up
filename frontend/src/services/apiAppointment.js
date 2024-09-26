const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

// Get all accepted invites
export const acceptedInvitations = async (token) => {
    const url = `${BACKEND_URL}/api/appointment`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching pending invitations:", error);
      throw error;
    }
  };

  //cancel appt
  export const cancelAppointment = async (token, appointmentId) => {
    const url = `${BACKEND_URL}/api/appointment/${appointmentId}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to cancel appointment");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error in cancel appointment:", error);
      throw error;
    }
  };

  //get all appointmentCounts
  export const fetchAppointmentCount = async (token) => {
    const url = `${BACKEND_URL}/api/appointment/count`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch");
      }
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error("Error fetching invitations count:", error);
      throw error;
    }
  }
  