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
    },
});

export default userSlice.reducer;

const userActions = userSlice.actions;

export { userActions };
