/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNameRegister, setPhoneRegister, setPasswordRegister,setEmail } from '../../../store/PatientRegister/patient';
import Alert from '../Alert/Alert';
import { emailValidation } from '../../../helper/helper';
import RegisterOne from '../registerPatient/patientregistersPatienttepone';
import RegisterTwo from '../registerPatient/patientregistersteptwo';

function FormRegsiter({backendUrl, patientRegister, patientRegisterOne, handlerPatientRegister, handlerPatientRegisterOne, handlerPatientTwo, registerTwo }) {
    const firstName = useRef(null);
    const emailRef = useRef(null);
    const phoneNumber = useRef(null);
    const password = useRef(null);
    const dispatch = useDispatch();
    const navgation = useNavigate();

    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [count, setCount] = useState(0);

    const showAlertWithMessage = (message, alertType) => {
        setCount(1);
        setMessage(message);
        setShowAlert(true);
        setType(alertType);
    };

    const handlerRegsiter = (e) => {
        e.preventDefault();

        const nameValue = firstName.current?.value;
        const phoneValue = phoneNumber.current?.value;
        const passwordValue = password.current?.value;
        const emailValue = emailRef.current?.value;
        const emailTest = emailValidation(emailValue);

        if (passwordValue === "") {
            showAlertWithMessage("The  Password field is required.", "warning");
        }

        if (passwordValue?.length < 8) {
            showAlertWithMessage("The  Password length must be more than 7.", "warning");
        }
        if (phoneValue === "") {
            showAlertWithMessage("The Phone Number field is required.", "warning");
        }
        if (emailTest) {
            showAlertWithMessage("The Email is not valid .", "warning");

        }
        if (emailValue === "") {
            showAlertWithMessage("The Email field is required.", "warning");

        }

        if (nameValue === "") {
            showAlertWithMessage("The  First Name is required.", "warning");
        }


        if (nameValue !== ""
            && phoneValue !== ""
            && passwordValue !== ""
            && emailValue !== ""
            && !emailTest
        ) {

            dispatch(setNameRegister(nameValue));
            dispatch(setPhoneRegister(phoneValue));
            dispatch(setPasswordRegister(passwordValue));
            dispatch(setEmail(emailValue));
            
            handlerPatientRegister(false);
            handlerPatientRegisterOne(true);

        }


    }
    return (
        <>
            {patientRegister && <form onSubmit={handlerRegsiter}>
                <div className="form-group form-focus">
                    <input
                        ref={firstName}
                        type="text"
                        className="form-control floating"
                    />
                    <label className="focus-label">Full Name</label>
                </div>

                <div className="form-group form-focus">
                    <input
                        ref={emailRef}
                        type="email"
                        className="form-control floating"
                    />
                    <label className="focus-label">Email</label>
                </div>
                <div className="form-group form-focus">
                    <input
                        ref={phoneNumber}
                        type="text"
                        className="form-control floating"
                    />
                    <label className="focus-label">Mobile Number</label>
                </div>
                <div className="form-group form-focus">
                    <input
                        ref={password}
                        type="password"
                        className="form-control floating"
                    />
                    <label className="focus-label">Create Password</label>
                </div>
                <div className="text-end">
                    <Link className="forgot-link" to="/login">
                        Already have an account?
                    </Link>
                </div>
                <button
                    className="btn btn-primary w-100 btn-lg login-btn"


                >
                    Signup
                </button>
                <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">or</span>
                </div>
                <div className="row form-row social-login">
                    <div className="col-6">
                        <Link to="#" className="btn btn-facebook w-100">
                            <i className="fab fa-facebook-f me-1" /> Login
                        </Link>
                    </div>
                    <div className="col-6">
                        <Link to="#" className="btn btn-google w-100">
                            <i className="fab fa-google me-1" /> Login
                        </Link>
                    </div>
                </div>
            </form>}
           
            <Alert
                count={count}
                message={message}
                setCount={setCount}
                setShow={setShowAlert}
                show={showAlert}
                type={type}
            />
             {patientRegisterOne && <RegisterOne handlerPatientRegisterOne={handlerPatientRegisterOne} handlerPatientTwo={handlerPatientTwo}/>}
            {registerTwo && <RegisterTwo backendUrl={backendUrl}/>}
        </>
    )
}

export default FormRegsiter
