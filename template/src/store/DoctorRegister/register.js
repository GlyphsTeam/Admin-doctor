import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    name: "",
    password: "",
    phone: "",
    img: null,
    gender: "",
    address: "",
    zipCode: "",
    certifcate: null,
    uploadImg: null,
    weight: "",
    height: "",
    age: "",
    city: "",
    state: "",
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
        setZipCode: (state, actions) => {
            state.zipCode = actions.payload
        },
        setCertfcation: (state, actions) => {
            state.certifcate = actions.payload
        },
        setUploadImg: (state, actions) => {
            state.uploadImg = actions.payload
        },
        setWight: (state, actions) => {
            state.weight = actions.payload
        },
        setHeight: (state, actions) => {
            state.height = actions.payload
        },
        setAge: (state, actions) => {
            state.age = actions.payload
        },
        setCity: (state, actions) => {
            state.city = actions.payload
        },
        setState: (state, actions) => {
            state.state = actions.payload
        }
    }
});

export const stateRegister = ((state) => state.register);

export const {
    setState,
    setCity,
    setAge,
    setHeight,
    setWight,
    setUploadImg,
    setCertfcation,
    setZipCode,
    setAddrees,
    setGender,
    setImage,
    setPhone,
    setName,
    setPassword
} = registerSlice.actions;

export default registerSlice.reducer;