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
    state: "",
    emergency_number: "",
    date: null,
    address: "",
    email: "",
    questionsIds: []
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
        },
        setEmergencyNumber: (state, actions) => {
            state.emergency_number = actions.payload;
        },
        setDate: (state, actions) => {
            state.date = actions.payload
        },
        setAddress: (state, actions) => {
            state.address = actions.payload;
        },
        setEmail: (state, actions) => {
            state.email = actions.payload
        },
        setQuestionsIdsRedux: (state, actions) => {
            state.questionsIds = actions.payload;
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
    setAddress,
    setBloodType,
    setRate,
    setQuestionsIdsRedux,
    setEmail,
    setLocation,
    setState,
    setEmergencyNumber,
    setDate
} = registerRedux.actions;

export default registerRedux.reducer;