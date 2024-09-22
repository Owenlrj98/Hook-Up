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

// Get all pending invites for user
export const invitationList = async (token) => {
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




// //get profile by user id
// export const getUserById = async (token, userId) => {
//   const url = `{BACKEND_URL}/api/invitation/${userId}`;
//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     return json;
//   } catch (error) {
//     console.log(error.message);
//     throw error;
//   }
// }
