import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    name: "",
    password: "",
    phone: "",
    img: null,
    gender: "",
    address: "",
    certifcate: null,
    uploadImg: null,
    date: "",
    city: "",
    state: "",
    cardNumber: "",
    nationality: "",
    doctorId: "",
    specialities: ""

};

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        setName: (state, actions) => {
            state.name = actions.payload
        },
        setPassword: (state, actions) => {
            state.password = actions.payload
        },
        setPhone: (state, actions) => {
            state.phone = actions.payload
        },
        setImage: (state, actions) => {
            state.img = actions.payload
        },
        setGender: (state, actions) => {
            state.img = actions.payload
        },
        setAddrees: (state, actions) => {
            state.address = actions.payload
        },

        setCertfcation: (state, actions) => {
            state.certifcate = actions.payload
        },
        setUploadImg: (state, actions) => {
            state.uploadImg = actions.payload
        },
        setDate: (state, actions) => {
            state.date = actions.payload;
        },
        setCardNumber: (state, actions) => {
            state.cardNumber = actions.payload;
        },
        setNationality: (state, actions) => {
            state.nationality = actions.payload
        },
        setDoctorID: (state, actions) => {
            state.doctorId = actions.payload
        },
        setSpecialities: (state, actions) => {
            state.specialities = actions.payload
        }

    }
});

export const stateRegister = ((state) => state.register);

export const {
    setUploadImg,
    setCertfcation,
    setAddrees,
    setGender,
    setImage,
    setPhone,
    setName,
    setPassword,
    setCardNumber,
    setDate,
    setDoctorID,
    setNationality,
    setSpecialities
} = registerSlice.actions;

export default registerSlice.reducer;