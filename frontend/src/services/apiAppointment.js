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