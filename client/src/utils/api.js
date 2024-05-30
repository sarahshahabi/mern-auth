import axios from "axios";

axios.defaults.baseURL = SERVER_URL;

export async function signup(formData) {
    try {
        const { data } = await axios.post("auth/api/signup", formData);
        return data;
    } catch (e) {
        return getError(e);
    }
}

export async function signin(formData) {
    try {
        const { data } = await axios.post("auth/api/signin", formData);
        return data;
    } catch (e) {
        return getError(e);
    }
}

export async function signInOrUpWithGoogle(formData) {
    try {
        const { data } = await axios.post("/auth/api/google", formData);
        return data;
    } catch (e) {
        return getError(e);
    }
}

function getError(e) {
    if (!e.response) {
        return { success: false, message: "ERROR" };
    } else {
        return { success: false, message: e.response.data.message };
    }
}
