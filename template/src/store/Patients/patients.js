import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    patientsData: null
};

const patientsSlice = createSlice({
    name: "patients",
    initialState,
    reducers: {
        setPatients: (state, actions) => {
            state.patientsData = actions.payload
        }
    }
});

export const statePatients = ((state) => state.patients);

export const { setPatients } = patientsSlice.actions;

export default patientsSlice.reducer;

