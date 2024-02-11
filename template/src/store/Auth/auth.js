import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuth: false,
    isLoading: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, actions) => {
            state.isAuth = actions.payload
        },
        setIsLoading: (state, actions) => {
            state.isLoading = actions.payload
        }
    }
});

export const stateAuth = ((state) => state.auth);

export const { setAuth, setIsLoading } = authSlice.actions;

export default authSlice.reducer;