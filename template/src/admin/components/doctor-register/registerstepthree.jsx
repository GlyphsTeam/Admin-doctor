import React, { useEffect, useState } from "react";
// import loginBanner from '../../../assets/images/login-banner.png';
import Logo from "../../assets/img/logo.png";
// import camera from '../../../assets/images/icons/camera.svg';
// import male from '../../../assets/images/icons/male.png'
// import female from '../../../assets/images/icons/female.png'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Alert from '../Alert/Alert';
import {
  setAddrees,
  setAge,
  setCertfcation,
  setCity,
  setGender,
  setHeight,
  setImage,
  setName,
  setPassword,
  setPhone,
  setState,
  setUploadImg,
  setWight,
  setZipCode,
} from "../../../store/DoctorRegister/register"
const Registerstepthree = () => {
  useEffect(() => {
    document.body.classList.add("account-page");

    return () => document.body.classList.remove("account-page");
  }, []);
  const [count, setCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const registerState = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const navgation = useNavigate();
  const showAlertMessage = (message, type) => {
    setCount(1);
    setMessage(message);
    setType(type);
    setShowAlert(true);
  };

  const handlerRegister = (e) => {
    e.preventDefault();

    const cityValue = e.target.city.value;
    const stateValue = e.target.state.value;

    if (!cityValue) {
      showAlertMessage("The City field is requried.", "warning");
    }
    if (!stateValue) {
      showAlertMessage("The state field is requried.", "warning");
    }

    if (cityValue && stateValue) {
      dispatch(setCity(cityValue));
      dispatch(setState(stateValue));

      let formData = new FormData();

      formData.append("name", registerState.name);
      formData.append("password", registerState.password);
      formData.append("phone", registerState.phone);
      formData.append("img", registerState.img);
      formData.append("gender", registerState.gender);
      formData.append("address", registerState.address);
      formData.append("zipcode", registerState.zipCode);
      formData.append("certifcate", registerState.certifcate);
      formData.append("uploadImg", registerState.uploadImg);
      formData.append("weight", registerState.weight);
      formData.append("height", registerState.height);
      formData.append("age", registerState.age);
      formData.append("city", registerState.city);
      formData.append("state", registerState.state);

      dispatch(setAddrees(""));
      dispatch(setPassword(""));
      dispatch(setPhone(""));
      dispatch(setUploadImg(null));
      dispatch(setGender(""));
      dispatch(setZipCode(""));
      dispatch(setHeight(""));
      dispatch(setWight(""));
      dispatch(setAge(""));
      dispatch(setCity(""));
      dispatch(setState(""));
      dispatch(setImage(null));
      dispatch(setName(""));
      dispatch(setCertfcation(null));
      navgation.push("")
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
                      <form onSubmit={handlerRegister}>
                        <h3 className="my-4">Your Location</h3>
                        <div className="form-group">
                          <label>Select City</label>
                          <select
                            className="form-select form-control"
                            id="city"
                            name="city"
                            tabIndex={-1}
                            aria-hidden="true"
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
                          >
                            <option value="">Select Your State</option>
                            <option value={1}>State 1</option>
                            <option value={2}>State 2</option>
                          </select>
                        </div>
                        <div className="mt-5">
                          <Link
                            to="/doctor/doctor-dashboard"
                            className="btn btn-primary w-100 btn-lg login-btn step5_submit"
                          >
                            Update{" "}
                          </Link>
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

export default Registerstepthree;
