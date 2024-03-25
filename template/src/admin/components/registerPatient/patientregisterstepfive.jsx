/* eslint-disable react/prop-types */
import React, { useState } from "react";
// import loginBanner from '../../assets/images/login-banner.png';
import Logo from "../../assets/img/logo.png";
// import camera from '../../assets/images/icons/camera.svg';
// import male from '../../assets/images/icons/male.png'
// import female from '../../assets/images/icons/female.png'
import { useDispatch, useSelector } from 'react-redux';
import { setLocation, setState } from '../../../store/PatientRegister/patient';
import { Link, useNavigate } from "react-router-dom";
import {
  setAge,
  setBloodType,
  setGenderRegister,
  setHeight,
  setImgProfile,
  setNameRegister,
  setPasswordRegister,
  setPhoneRegister,
  setRate,
  setWeight,
} from '../../../store/PatientRegister/patient';
import Alert from "../Alert/Alert";
import axios from 'axios';

const Patientregisterstepfive = ({ backendUrl }) => {
  const dispatch = useDispatch();
  const navgation = useNavigate();
  const registerState = useSelector((state) => state.patient);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("access_token");
  const hanlderSubmit = async (e) => {
    e.preventDefault();
    const city = e.target.city.value;
    const state = e.target.state.value;
    const pregnant = e.target.pregnant.value;
    const taking_medications = e.target.taking_medications.value;
    const allergies = e.target.allergies.value;


    if (state === "") {
      setCount(1);
      setType("warning");
      setMessage("The state field is required");
      setShowAlert(true);
    }

    if (city === "") {
      setCount(1);
      setType("warning");
      setMessage("The city field is required");
      setShowAlert(true);
    }

    if (city !== "" && state !== "") {

      let formData = new FormData();

      formData.append("name", registerState?.name);
      formData.append("email", registerState.email)
      formData.append("date_birth", registerState.date)
      formData.append("emergency_number", registerState.emergency_number)
      formData.append("country", state)
      formData.append("city", city)
      formData.append("address", registerState.address)
      formData.append("phone_number", registerState?.phone);
      formData.append("guard", "patient")
      formData.append("password", registerState.password);
      formData.append("image", registerState.imgProfile);
      formData.append("age", registerState.age);
      formData.append("blood_type", registerState.bloodType);
      formData.append("location", registerState.location);
      formData.append("gender", registerState.gender);
      formData.append("height", registerState.height);
      formData.append("weight", registerState.weight);
      formData.append("rate", registerState.rate);
      // formData.append("state", registerState.state);
      formData.append("taking_medications", taking_medications);
      formData.append("pregnant", pregnant);
      formData.append("allergies", allergies);
      await axios.post(`https://${backendUrl}/register`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(() => {
        dispatch(setAge(""));
        dispatch(setBloodType(""));
        dispatch(setPasswordRegister(""));
        dispatch(setGenderRegister(""));
        dispatch(setWeight(""));
        dispatch(setImgProfile(null));
        dispatch(setRate(""));
        dispatch(setLocation(""));
        dispatch(setState(""));
        dispatch(setHeight(""));
        dispatch(setPhoneRegister(""));
        dispatch(setNameRegister(""));
        navgation("/admin/patient-list")

      }).catch((err) => {
        console.log(err)
      })


    }
  }

  return (
    <>
      <>
        {/* Page Content */}
        <div className="content login-page pt-0">
          <div className="container-fluid">
            {/* Register Content */}
            <div className="account-content">
              <div className="row align-items-center">
                <div className="login-right">
                  <div className="inner-right-login">
                    <div className="login-header">
                      <div className="logo-icon">
                        <img src={Logo} alt="" />
                      </div>
                      <div className="step-list">
                        <ul>
                          <li>
                            <Link to="#" className="active-done">
                              1
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="active-done">
                              2
                            </Link>
                          </li>

                          <li>
                            <Link to="#" className="active">
                              3
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <form onSubmit={hanlderSubmit}>
                        <h3 className="my-4">Your Location</h3>
                        <div className="form-group">
                          <label>Select City</label>
                          <select
                            className="form-select form-control"
                            id="city"
                            name="city"
                            tabIndex={-1}
                            aria-hidden="true"
                          // onChange={(e) => dispatch(setLocation(e.target.value))}
                          >
                            <option value="">Select Your City</option>
                            <option value={1}>City 1</option>
                            <option value={2}>City 2</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Select State</label>
                          <select
                            className="form-select form-control"
                            id="state"
                            name="state"
                            tabIndex={-1}
                            aria-hidden="true"
                          // onChange={(e) => dispatch(setState(e.target.value))}
                          >
                            <option value="">Select Your State</option>
                            <option value={1}>State 1</option>
                            <option value={2}>State 2</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label>Are you currently taking any medications? if yes, please list them.</label>
                          <input
                            type="text"
                            name="taking_medications"
                            id="taking_medications"
                            className="form-control"

                          />
                        </div>
                        <div className="form-group">
                          <label>Do youhave any known allergies to medications or substances?</label>
                          <input
                            type="text"
                            name="allergies"
                            id="allergies"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label>For female patients: Are you currently pregnant?</label>
                          <select
                            className="form-select form-control"
                            id="pregnant"
                            name="pregnant"
                            tabIndex={-1}
                            aria-hidden="true"
                          // onChange={(e) => dispatch(setLocation(e.target.value))}
                          >
                            <option value="">Select </option>
                            <option value={1}>Yes</option>
                            <option value={0}>No</option>
                          </select>
                        </div>
                        <div className="mt-5">
                          <button
                          type="submit"
                            className="btn btn-primary w-100 btn-lg login-btn step5_submit"
                          >
                            continue{" "}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="login-bottom-copyright">
                    <span>© 2022 Doccure. All rights reserved.</span>
                  </div>
                </div>
              </div>
            </div>
            {/* /Register Content */}
          </div>
        </div>
        {/* /Page Content */}
      </>
      <Alert
        count={count}
        message={message}
        setCount={setCount}
        setShow={setShowAlert}
        show={showAlert}
        type={type}
      />
    </>
  );
};

export default Patientregisterstepfive;
