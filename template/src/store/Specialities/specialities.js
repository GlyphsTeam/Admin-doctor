import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    specialitiesData: null
};

const specialSlice = createSlice({
    name: "specialities",
    initialState,
    reducers: {
        setSpecialities: (state, actions) => {
            state.specialitiesData = actions.payload;
        }
    }
});

export const stateSpical = ((state) => state.specialities);

export const { setSpecialities } = specialSlice.actions;

export default specialSlice.reducer;
