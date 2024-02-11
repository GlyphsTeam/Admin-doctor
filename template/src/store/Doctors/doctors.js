import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    doctors: null
};

const doctorSlice = createSlice({
    name: "doctors",
    initialState,
    reducers: {
        setDoctors: (state, actions) => {
            state.doctors = actions.payload;
        }
    }
});

export const stateDoctors = ((state) => state.doctors);

export const { setDoctors } = doctorSlice.actions;

export default doctorSlice.reducer;