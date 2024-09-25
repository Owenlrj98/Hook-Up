const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;
import { extractPayload } from "../../utils/jwUtils";

export async function fetchLocations(token) {
    const url = `${BACKEND_URL}/api/location/`;
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
  
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error("Error fetching locations:", error);
      throw error;
    }
  }