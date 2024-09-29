const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;
import { extractPayload } from "../../utils/jwUtils";

// user signup
export async function userSignUp(data) {
    // const url = `${BACKEND_URL}/api/user/signup`;
    const url = `/api/user/signup`;

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
        return json.token;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// user login
export async function userLogin(data) {
    // const url = `${BACKEND_URL}/api/user/login`;
    const url = '/api/user/login';
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
        return json.token;
    } catch (error) {
        console.log(error.message);
        throw error;
    }

}

