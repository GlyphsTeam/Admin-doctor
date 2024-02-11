import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dashboardData: null
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setDashBoardData: (state, actions) => {
            state.dashboardData = actions.payload;
        }
    }
});

export const stateDash = ((state) => state.dashboard);

export const { setDashBoardData } = dashboardSlice.actions;

export default dashboardSlice.reducer;

