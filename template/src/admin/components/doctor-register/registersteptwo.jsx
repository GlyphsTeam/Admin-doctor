import React, { useEffect, useState } from "react";
// import loginBanner from "../../../assets/images/login-banner.png";
import Logo from "../../assets/img/logo.png";
import camera from "../../assets/icons/camera.svg";
import male from "../../assets/icons/male.png";
import female from "../../assets/icons/female.png";
import Alert from '../Alert/Alert';

import {
  setName,
  setPassword,
  setImage,
  setGender,
  setCertfcation,
  setUploadImg,
  setCardNumber,
  setPhone,
  setDate,
  setDoctorID,
  setNationality,
  setSpecialities,

} from '../../../store/DoctorRegister/register';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const Registersteptwo = () => {
  const dispatch = useDispatch();
  const registerState = useSelector((state) => state.register);
  const history = useHistory();

  useEffect(() => {
    document.body.classList.add("account-page");


    return () => document.body.classList.remove("account-page");
  }, []);

  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [type, setType] = useState("");

  const showAlertMessage = (message, type) => {
    setCount(1);
    setMessage(message);
    setShowAlert(true);
    setType(type);
  };

  const handlerRegister = (e) => {

    e.preventDefault();



    const genderValue = e.target.gender.value;
    const dateValue = e.target.date.value;
    const specialitiesValue = e.target.specialities.value;
    const idnumber = e.target.idnumber.value;
    const nationalityValue = e.target.nationality;
    const cardNumberValue = e.target.cardnumber;

    if (!specialitiesValue) {
      showAlertMessage("The Specialities fuekd us required.", "warning");
    }
    if (!dateValue) {
      showAlertMessage("The Age field is required.", "warning");
    }

    if (!idnumber) {
      showAlertMessage("The ID number field is required.", "warning");
    }
    if (!nationalityValue) {
      showAlertMessage("The Nationality feild is required.", "warning");
    }
    if (!cardNumberValue) {
      showAlertMessage("The Card Number feild is required", "warning");
    }
    if (!genderValue) {
      showAlertMessage("The Gender  field is required.", "warning");
    }

    if (genderValue !== ""
      && dateValue !== ""
      && specialitiesValue !== ""
      && dateValue !== ""
      && idnumber !== ""
      && nationalityValue !== ""
      && cardNumberValue !== ""
    ) {
      dispatch(setGender(genderValue));
      dispatch(setDate(dateValue));
      let formData = new FormData();

      formData.append("name", registerState.name);
      formData.append("password", registerState.password);
      formData.append("phone", registerState.phone);
      formData.append("img", registerState.img);
      formData.append("gender", registerState.gender);
      formData.append("address", registerState.address);
      formData.append("certifcate", registerState.certifcate);
      formData.append("uploadImg", registerState.uploadImg);
      formData.append("date", registerState.date);
      formData.append("cardNumber", registerState.cardNumber);
      formData.append("nationality", registerState.nationality);
      formData.append("doctorId", registerState.doctorId);
      formData.append("specialities", registerState.specialities);

      dispatch(setDoctorID(""));
      dispatch(setCardNumber(""));
      dispatch(setNationality(""));
      dispatch(setSpecialities(""));
      dispatch(setPassword(""));
      dispatch(setPhone(""));
      dispatch(setUploadImg(null));
      dispatch(setGender(""));
      dispatch(setImage(null));
      dispatch(setName(""));
      dispatch(setCertfcation(null));
      history.push("/admin/register-step- 3");
    }
  }
  const handlerUpload = (e) => {
    const image = e.target.files[0];
    console.log(image)
    if (image?.type !== 'image/jpeg' &&
      image?.type !== 'image/png' &&
      image?.type !== 'image/jpg') {
      showAlertMessage("The Image must be jpeg or png or jpg", "warning");
    }
    else {
      dispatch(setCertfcation(image))
    }
  }
  return (
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
                    <form id="personal_details" onSubmit={handlerRegister}>
                      <div className="text-start mt-2">
                        <h4 className="mt-3">Select Your Gender</h4>
                      </div>
                      <div className="select-gender-col">
                        <div className="row">
                          <div className="col-6 pe-0">
                            <input
                              type="radio"
                              id="test1"
                              name="gender"
                              defaultChecked=""
                              defaultValue="Male"
                            />
                            <label htmlFor="test1">
                              <span className="gender-icon">
                                <img src={male} alt="" />
                              </span>
                              <span>Male</span>
                            </label>
                          </div>
                          <div className="col-6 ps-2">
                            <input
                              type="radio"
                              id="test2"
                              name="gender"
                              defaultValue="Female"
                            />
                            <label htmlFor="test2">
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
                          <label>
                            How many years have you been registered?
                          </label>
                          <select
                            className="form-select form-control"
                            id="register_years"
                            name="register_years"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value="">
                              Tell us how long you have been practicing
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
                            <option value="10+">10+</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Residence Card Number (Validation)</label>
                          <input
                            type="text"
                            name="cardnumber"
                            className="form-control"
                            id="cardnumber"
                          />
                        </div>
                        <div className="form-group">
                          <label>Nationality</label>
                          <input
                            type="text"
                            name="nationality"
                            className="form-control"
                            id="nationality"
                          />
                        </div>
                        <div className="form-group">
                          <label>Doctor ID Number</label>
                          <input
                            type="text"
                            name="idnumber"
                            className="form-control"
                            id="idnumber"
                          />
                        </div>
                        {/*                     
                        <div className="form-group">
                          <label>Pincode / Zipcoode</label>
                          <input
                            type="text"
                            name="zipcode"
                            className="form-control"
                            id="zipcode"
                          />
                        </div> */}
                        <div className="form-group">
                          <label>Certification and Employer</label>
                          <div className="row justify-content-center">
                            <div className="col-12 col-md-6 d-flex">
                              <div className="profile-pic-upload d-flex flex-wrap justify-content-center">
                                <div className="cam-col">
                                  <img src={registerState.certifcate ? URL.createObjectURL(registerState.certifcate) : camera} alt="" />
                                </div>
                                <span className="text-center">
                                  Upload Rigth To sell Certigifcate
                                </span>
                                <input
                                  type="file"
                                  id="quali_certificate"
                                  onChange={(e) => handlerUpload(e)}
                                  name="quali_certificate"
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-6 d-flex">
                              <div className="profile-pic-upload d-flex flex-wrap justify-content-center">
                                <div className="cam-col">
                                  <img src={camera} alt="" />
                                </div>
                                <span className="text-center">
                                  Upload Photo ID
                                </span>
                                <input
                                  type="file"
                                  id="photo_id"
                                  name="photo_id"
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-6 d-flex">
                              <div className="profile-pic-upload d-flex flex-wrap justify-content-center">
                                <div className="cam-col">
                                  <img src={camera} alt="" />
                                </div>
                                <span className="text-center">
                                  Upload Clinical employment
                                </span>
                                <input
                                  type="file"
                                  id="clinical_employment"
                                  name="clinical_employment"
                                />
                              </div>
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
                          <label>Specialities</label>
                          <select
                            className="form-select form-control"
                            id="specialities"
                            name="specialities"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <option value="">Select your blood group</option>
                            <option value="A-">Urology</option>
                            <option value="A+">Neurology</option>
                            <option value="B-">Orthopedic</option>
                            <option value="B+">Cardiologist</option>
                            <option value="AB-">Dentist</option>
                          </select>
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
      <Alert
        count={count}
        message={message}
        setCount={setCount}
        setShow={setShowAlert}
        show={showAlert}
        type={type}
      />
      {/* /Page Content */}
    </>
  );
};

export default Registersteptwo;
