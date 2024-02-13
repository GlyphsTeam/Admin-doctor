import React, { useState } from "react";
import { logoWhite } from "../imagepath";
import { Link } from "react-router-dom";
import { emailValidation } from '../../../helper/helper';
import Alert from '../Alert/Alert';

const ForgotPassword = () => {
  
  const [count, setCount] = useState(0);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const showAlertMessage = (message, type) => { 
    setCount(1);
    setMessage(message);
    setType(type);
    setShowAlert(true);
  }

  const handlerForget = (e) => {
    e.preventDefault();

    const email = e.target.email.value;


    if(emailValidation(email)){
      showAlertMessage("The Email is not valid", "warning");
    }
    if (!email) {
      showAlertMessage("The Email feild is requried", "warning")
    }
    
    if(email){
      let formData = new FormData();
      formData.append("email", email);
      e.target.reset();
    }

  }
  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={logoWhite} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Forgot Password?</h1>
                  <p className="account-subtitle">
                    Enter your email to get a password reset link
                  </p>
                  {/* Form */}
                  <form onSubmit={handlerForget}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button className="btn btn-primary w-100" type="submit">
                        Reset Password
                      </button>
                    </div>
                  </form>
                  {/* /Form */}
                  <div className="text-center dont-have">
                    Remember your password? <Link to="/admin/login">Login</Link>
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
    </>
  );
};

export default ForgotPassword;
