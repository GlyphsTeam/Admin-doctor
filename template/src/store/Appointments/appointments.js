import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    appointments: null
};

const appointmentSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        setAppointments: (state, actions) => {
            state.appointments = actions.payload;
        }
    }
});

export const stateAppointments = ((state) => state.appointments);

export const { setAppointments } = appointmentSlice.actions;

export default appointmentSlice.reducer;

