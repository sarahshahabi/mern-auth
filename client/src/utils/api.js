import axios from "axios";

axios.defaults.baseURL = SERVER_URL;

export default async function signup(formData) {
    try {
        const { data } = await axios.post("/api/signup", formData);
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
