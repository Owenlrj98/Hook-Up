const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

// Create invite
export const createInvite = async (token, recipientId, inviteData) => {
    const url = `${BACKEND_URL}/api/invitation/${recipientId}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inviteData),
      });
      if (!response.ok) {
        throw new Error("Failed to create invite.");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error creating invite:", error);
      throw error;
    }
  };
  