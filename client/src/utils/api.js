import axios from "axios";

export async function signup(formData) {
    try {
        const { data } = await axios.post("api/auth/signup", formData);
        return data;
    } catch (e) {
        return getError(e);
    }
}

export async function signin(formData) {
    try {
        const { data } = await axios.post("api/auth/signin", formData);
        return data;
    } catch (e) {
        return getError(e);
    }
}

export async function signInOrUpWithGoogle(formData) {
    try {
        const { data } = await axios.post("/api/auth/google", formData);
        return data;
    } catch (e) {
        return getError(e);
    }
}

export async function updateUserById(id, formData) {
    try {
        const { data } = await axios.put(`/api/user/update/${id}`, formData);
        return data;
    } catch (e) {
        return getError(e);
    }
}

export async function deleteAccount(id) {
    try {
        const { data } = await axios.delete("/api/user/delete/" + id);
        return data;
    } catch (e) {
        return getError(e);
    }
}

export async function signOutUser() {
    try {
        const { data } = await axios.get("/api/auth/signout");
        return data;
    } catch (e) {
        return getError();
    }
}

function getError(e) {
    if (!e.response) {
        return { success: false, message: "ERROR" };
    } else {
        return { success: false, message: e.response.data.message };
    }
}
