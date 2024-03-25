/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";
// import loginBanner from '../../assets/images/login-banner.png';
import Logo from "../../assets/img/logo.png";
// import camera from '../../assets/images/icons/camera.svg';
import male from "../../../client/assets/images/icons/male.png";
import female from "../../assets/icons/female.png";
import {
  setGenderRegister,
  setHeight,
  setWeight,
  setAge,
  setBloodType,
  setRate,
  setEmergencyNumber,
  setDate,
  setQuestionsIdsRedux,
  setAddress
} from '../../../store/PatientRegister/patient';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Alert from "../Alert/Alert";
import axios from 'axios';

const Patientregistersteptwo = ({ backendUrl }) => {


  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [count, setCount] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [questionsIds, setQuestionsIds] = useState([]);

  const dispatch = useDispatch();
  const navgation = useNavigate();

  const getQuestions = async () => {
    await axios.get(`https://${backendUrl}/medical_conditions`).then((res) => {
      console.log("resS", res.data)
      setQuestions(res.data?.data);

    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    getQuestions();
  }, []);
  const addIdsQuestions = (id, checked) => {
    if (checked) {
      setQuestionsIds(prev => [...prev, id]);
    } else {
      setQuestionsIds(prev => prev.filter(item => item !== id));
    }
  };

  const handlerRegister = (e) => {
    e.preventDefault();

    const gender = e.target.gender.value;
    const weight = e.target.weight.value;
    const height = e.target.height.value;
    const age = e.target.age.value;
    const blood = e.target.blood_group.value;
    const rate = e.target.heartrate.value;
    const date = e.target.date.value;
    const emergency = e.target.emergency.value;
    const address = e.target.address.value;
    // const bloodPressure = e.target.bp.value;


    // if (blood === "") {
    //   setCount(1);
    //   setMessage("The blood field is required");
    //   setShowAlert(true);
    //   setType("warning")
    // }
    // if (age === "") {
    //   setCount(1);
    //   setMessage("The Age field is required");
    //   setShowAlert(true);
    //   setType("warning");
    // }
    // if (height === "") {
    //   setCount(1);
    //   setMessage("The height field is required");
    //   setShowAlert(true);
    //   setType("warning");
    // }
    // if (weight === "") {
    //   setCount(1);
    //   setMessage("The weight field is required");
    //   setShowAlert(true);
    //   setType("warning");
    // }
    if (gender === "") {
      setCount(1);
      setMessage("The gender field is required");
      setShowAlert(true);
      setType("warning");
    }

    if (
      // weight !== "" &&
      // height !== "" &&
      // age !== "" &&
      // blood !== "" &&
      // rate !== "" &&
      gender !== ""
    ) {

      dispatch(setGenderRegister(gender));
      dispatch(setBloodType(blood));
      dispatch(setAge(age));
      dispatch(setRate(rate));
      dispatch(setHeight(height));
      dispatch(setWeight(weight))
      dispatch(setEmergencyNumber(emergency));
      dispatch(setDate(date));
      dispatch(setAddress(address))
      dispatch(setQuestionsIdsRedux(questionsIds))
      navgation("/admin/patientregisterstep-5");
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
                            <Link to="#" className="active">
                              2
                            </Link>
                          </li>

                          <li>
                            <Link to="#">3</Link>
                          </li>
                        </ul>
                      </div>
                      <form id="personal_details" encType="multipart/form-data" onSubmit={handlerRegister}>
                        <div className="text-start mt-2">
                          <h4 className="mt-3">Select Your Gender</h4>
                        </div>
                        <div className="select-gender-col">
                          <div className="row">
                            <div className="col-6 pe-0">
                              <input
                                type="radio"
                                id="male"
                                name="gender"
                                defaultValue="male"
                              // onChange={(e) => dispatch(setGenderRegister(e.target.value))}
                              />
                              <label htmlFor="male">
                                <span className="gender-icon">
                                  <img src={male} alt="" />
                                </span>
                                <span>Male</span>
                              </label>
                            </div>
                            <div className="col-6 ps-2">
                              <input
                                type="radio"
                                id="female"
                                name="gender"
                                // onChange={(e) => dispatch(setGenderRegister(e.target.value))}
                                defaultValue="female"
                              />
                              <label htmlFor="female">
                                <span className="gender-icon">
                                  <img src={female} alt="" />
                                </span>
                                <span>Female</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="step-process-col mt-4">
                          <div
                            className="form-group"
                            id="preg_div"
                            style={{ display: "none" }}
                          >
                            <label>Pregnancy Term</label>
                            <select
                              className="form-select form-control"
                              id="preg_term"
                              name="preg_term"
                              tabIndex={-1}
                              aria-hidden="true"
                            >
                              <option selected="" value="">
                                Select Your Pregnancy Month
                              </option>
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value="">7</option>
                              <option value={8}>8</option>
                              <option value={9}>9</option>
                              <option value={10}>10</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Your Weight</label>
                            <div className="row">
                              <div className="col-7 pe-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="weight"
                                  defaultValue="weight"
                                  id="weight"
                                />
                              </div>
                              <div className="col-5 ps-2">
                                <select
                                  className="form-select form-control"
                                  id="weight_unit"
                                  name="weight_unit"
                                >
                                  <option value="kg">Kg</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Your Height</label>
                            <div className="row">
                              <div className="col-7 pe-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="height"
                                />
                              </div>
                              <div className="col-5 ps-2">
                                <select
                                  className="form-select form-control"
                                  id="height_unit"
                                  name="height_unit"
                                  tabIndex={-1}
                                  aria-hidden="true"
                                >
                                  <option value="cm">cm</option>
                                  <option value="ft">ft</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Your Date</label>
                            <input
                              type="date"
                              name="date"
                              className="form-control"
                              id="date"
                            />
                          </div>
                          <div className="form-group">
                            <label>Emergency Contact Number</label>
                            <input
                              type="text"
                              name="emergency"
                              // onChange={(e) => dispatch(setAge(e.target.value))}
                              className="form-control"
                              id="emergency"
                            />
                          </div>
                          <div className="form-group">
                            <label>Street Address</label>
                            <input
                              type="text"
                              name="address"
                              // onChange={(e) => dispatch(setAge(e.target.value))}
                              className="form-control"
                              id="address"
                            />
                          </div>
                          <div className="form-group">
                            <label>Your Age</label>
                            <input
                              type="text"
                              name="age"
                              // onChange={(e) => dispatch(setAge(e.target.value))}
                              className="form-control"
                              id="age"
                            />
                          </div>
                          <div className="form-group">
                            <label>Blood Type</label>
                            <select
                              className="form-select form-control"
                              id="blood_group"
                              name="blood_group"
                              tabIndex={-1}
                              // onChange={(e) => dispatch(setBloodType(e.target.value))}
                              aria-hidden="true"
                            >
                              <option value="">Select your blood group</option>
                              <option value="A-">A-</option>
                              <option value="A+">A+</option>
                              <option value="B-">B-</option>
                              <option value="B+">B+</option>
                              <option value="AB-">AB-</option>
                              <option value="AB+">AB+</option>
                              <option value="O-">O-</option>
                              <option value="O+">O+</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Heart Rate</label>
                            <select
                              className="form-select form-control"
                              id="heartrate"
                              name="heartrate"
                              tabIndex={-1}
                              aria-hidden="true"
                            >
                              <option value="">Select Your Heart Rate</option>
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                            </select>
                          </div>


                          <div className="checklist-col pregnant-col">
                            {questions?.map((item) => {
                              return <div className="remember-me-col d-flex justify-content-between" key={item.id}>
                                <span className="mt-1">
                                  {item?.title}
                                </span>
                                <label className="custom_check">
                                  <input
                                    type="checkbox"
                                    value={item.id}
                                    name="artery"
                                    id="artery"
                                    onChange={(e) => addIdsQuestions(item.id, e.target.checked)}

                                  />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            })}

                          </div>
                        </div>
                        <div className="mt-5">
                          <button

                            className="btn btn-primary w-100 btn-lg login-btn step2_submit"
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

export default Patientregistersteptwo;
