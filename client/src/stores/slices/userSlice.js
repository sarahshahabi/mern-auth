import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoading: false,
    error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
            (state.isLoadingoading = false), (state.error = false);
        },
        setError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        setUpdateUserStart(state) {
            state.isLoading = true;
        },
        setUpdatedUser(state, action) {
            (state.isLoading = false), (state.error = false);
            state.user = action.payload;
        },
        setUserUpdatedError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        setDeleteUserStart(state) {
            state.isLoading = true;
        },
        deletedUserSuuccess(state) {
            (state.isLoading = false), (state.error = false);
            state.user = null;
        },
        setUserDeletedError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        setSignedout(state) {
            (state.user = null), (state.isLoading = false);
            state.error = null;
        },
    },
});

export default userSlice.reducer;

const userActions = userSlice.actions;

export { userActions };
