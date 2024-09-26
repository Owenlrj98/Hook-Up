const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;
import { extractPayload } from "../../utils/jwUtils";

export async function adminLogin(data) {
  const url = `${BACKEND_URL}/api/admin/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.adminToken;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

//Create location
export const createLocation = async (adminToken, formData) => {
  const url = `${BACKEND_URL}/api/admin/location`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${adminToken}`,
        // "Content-Type": "application/json",
      },
      // body: JSON.stringify(locationData),
      body: formData,
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

// Get all locations
export async function locationsList(adminToken) {
  const url = `${BACKEND_URL}/api/admin/location`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch");
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
}

//user count
export const fetchUserCount = async (adminToken) => {
  const url = `${BACKEND_URL}/api/admin/count`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${adminToken}`,
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
    console.error("Error fetching pending invitations:", error);
    throw error;
  }
};

// remove gym
export const removeGym = async (adminToken, gymId) => {
  const url = `${BACKEND_URL}/api/admin/location/${gymId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to remove gym");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in remove gym:", error);
    throw error;
  }
};

