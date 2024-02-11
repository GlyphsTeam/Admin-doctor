import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    settingData: null
};

const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        setSettingData: (state, actions) => {
            state.settingData = actions.payload;
        }
    }
});

export const stateSetting = ((state) => state.setting);

export const { setSettingData } = settingSlice.actions;

export default settingSlice.reducer;
