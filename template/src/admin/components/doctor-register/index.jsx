import React, { useEffect, useRef, useState } from "react";
// import { useHistory } from "react-router-dom";
import loginBanner from "../../assets/img/login-banner.png";
import { Link, useNavigate } from "react-router-dom";
import { setName, setPassword, setPhone,setEmail } from '../../../store/DoctorRegister/register';
import Header from "../header/index";
import { useDispatch } from 'react-redux'
// import Footer from "../../components/";
import Alert from '../Alert/Alert';


const DoctorRegister = (props) => {
  
  const name = useRef(null);
  const phoneNumber = useRef(null);
  const password = useRef(null);
  const emailRef = useRef(null);
  const dispatch = useDispatch();
  const navgation = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [count, setCount] = useState(0);



  // const navgation = useHistory();
  useEffect(() => {
    document.getElementsByTagName("body")[0].className = "account-page";

    return () => (document.getElementsByTagName("body")[0].className = "");
  });
  const alertShowMessage = (message, type) => {
    setMessage(message);
    setType(type);
    setShowAlert(true);
    setCount(1);
  };

  const handlerRegister = (e) => {
    e.preventDefault();

    const nameValue = name.current.value;
    const phoneValue = phoneNumber.current.value;
    const passwordValue = password.current.value;
    const emailValue = emailRef.current?.value;

    if (!passwordValue) {
      alertShowMessage("The password field is required", "warning");
    }
    if (!phoneValue) {
      alertShowMessage("The phone field is required", "warning");
    }
    if(!emailValue){
      alertShowMessage("The Email field is required", "warning");
    }
    if (!nameValue) {
      alertShowMessage("The name field is required", "warning");
    }
    if (nameValue !== "" && phoneValue !== "" && passwordValue !== "") {

      dispatch(setName(nameValue));
      dispatch(setPassword(passwordValue));
      dispatch(setPhone(phoneValue));
      dispatch(setEmail(emailValue));
      
      navgation("/admin/registerstepone")
    }


  }
  return (
    <>
      <Header {...props} />
      <div className="content top-space">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7 col-lg-6 login-left">
                    <img
                      src={loginBanner}
                      className="img-fluid"
                      alt="Login Banner"
                    />
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header">
                      <h3>
                        Doctor Register{" "}
                        <Link to="/register">Not a Doctor?</Link>
                      </h3>
                    </div>

                    <form onSubmit={handlerRegister}>
                      <div className="form-group form-focus">
                        <input type="text" className="form-control floating" ref={name} />
                        <label className="focus-label">Name</label>
                      </div>
                      <div className="form-group form-focus">
                        <input type="email" className="form-control floating" ref={emailRef} />
                        <label className="focus-label">Email</label>
                      </div>
                      <div className="form-group form-focus">
                        <input type="text" className="form-control floating" ref={phoneNumber} />
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
                        <Link to="/login" className="forgot-link">
                          Already have an account?
                        </Link>
                      </div>
                      <button
                        className="btn btn-primary w-100 btn-lg login-btn"
                        type="submit"
                      // onClick={() => history.push("/pages/onboarding-email")}
                      >
                        Signup
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      {/* <Footer {...props} /> */}
    </>
  );
};

export default DoctorRegister;
