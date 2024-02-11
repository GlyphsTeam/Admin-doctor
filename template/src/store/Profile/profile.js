import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    profileData: null
};


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfileData: (state, actions) => {
            state.profileData = actions.payload;
        }
    }
});

export const stateProfile = ((state) => state.profile);

export const { setProfileData } = profileSlice.actions;

export default profileSlice.reducer;
