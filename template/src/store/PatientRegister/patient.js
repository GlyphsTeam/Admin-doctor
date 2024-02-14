import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    name: "",
    phone: "",
    password: "",
    imgProfile: null,
    gender: "",
    weight: "",
    height: "",
    age: "",
    bloodType: "",
    rate: "",
    location: "",
    state: ""
}

const registerRedux = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        setNameRegister: (state, actions) => {
            state.name = actions.payload;
        },
        setPhoneRegister: (state, actions) => {
            state.phone = actions.payload;
        },
        setPasswordRegister: (state, actions) => {
            state.password = actions.payload;
        },
        setImgProfile: (state, actions) => {
            state.imgProfile = actions.payload;
        },
        setGenderRegister: (state, actions) => {
            state.gender = actions.payload;
        },
        setWeight: (state, actions) => {
            state.weight = actions.payload;
        },
        setHeight: (state, actions) => {
            state.height = actions.payload;
        },
        setAge: (state, actions) => {
            state.age = actions.payload;
        },
        setBloodType: (state, actions) => {
            state.bloodType = actions.payload;
        },
        setRate: (state, actions) => {
            state.rate = actions.payload;
        },
        setLocation: (state, actions) => {
            state.location = actions.payload;
        },
        setState: (state, actions) => {
            state.state = actions.payload;
        }
    }
});


export const stateRegister = ((state) => state.patient);

export const {
    setNameRegister,
    setPhoneRegister,
    setPasswordRegister,
    setImgProfile,
    setGenderRegister,
    setWeight,
    setHeight,
    setAge,
    setBloodType,
    setRate,
    setLocation,
    setState
} = registerRedux.actions;

export default registerRedux.reducer;