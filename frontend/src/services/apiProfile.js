const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;
import { extractPayload } from "../../utils/jwUtils";

//get random profile
export async function fetchRandomUser(token) {
  const url = `${BACKEND_URL}/api/user`;

  try {
    const response = await fetch(url, {
      method: "GET", // Specify the request method
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for authorization
        "Content-Type": "application/json", // Set content type to JSON
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Get the error message from the response
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error("Error in fetchRandomUser:", error.message);
    throw error; // Re-throw error for further handling
  }
}

//get own profile
export async function fetchOwnProfile(token) {
  const userId = extractPayload(token)._id;
  const url = `${BACKEND_URL}/api/user/${userId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

//create and edit profile
export const createEditProfile = async (token, formData) => {
  const userId = extractPayload(token)._id;
  const url = `${BACKEND_URL}/api/profile/${userId}/details`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
      },
      // body: JSON.stringify(formData),
      body: formData,

    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

