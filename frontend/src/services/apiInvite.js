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

// Get all pending invites from me to others
export const invitationListTo = async (token) => {
  const url = `${BACKEND_URL}/api/invitation/list`;
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

//get all pending invites to me from others
export const invitationListFrom = async (token) => {
  const url = `${BACKEND_URL}/api/invitation/pending`;
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

//change invitation status
export const updateInvitationStatus = async (token, invitationId, status) => {
  const url = `${BACKEND_URL}/api/invitation/pending/${invitationId}`;
  try {
    const response = await fetch(url, {
      method: "PUT", // Assuming you're using PATCH to update
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update invitation");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating invitation status:", error);
    throw error;
  }
};
