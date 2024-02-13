import React, { useState } from "react";
import { logoWhite } from "../imagepath";
import { Link } from "react-router-dom";
import Alert from '../Alert/Alert';
import { emailValidation, passwordValidation } from '../../../helper/helper';
const Register = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [showALert, setShowAlert] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const showAlertMessage = (message, type) => {
    setCount(1);
    setMessage(message);
    setShowAlert(true);
    setType(type);
  };

  const handlerRegister = (e) => {
    e.preventDefault();

    if (!passwordValidation(confirmPassword)) {
      showAlertMessage("The Confirm Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character", "warning")
    }
    if (confirmPassword === "") {
      showAlertMessage("The Confirm field is requried", "warning");
    }
    if (passwordValidation(password)) {
      showAlertMessage("The Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character", "warning")
    }
    if (password === "") {
      showAlertMessage("The Password feild is requried", "warning");
    }
    if (emailValidation(email)) {
      showAlertMessage("The Email is not valid", "warning");
    }
    if (email === "") {
      showAlertMessage("The Email feild is requried", "warning")
    }
    // if (name === "") {
    //   showAlertMessage("The Name field is requried", "warning");
    // }
    if (name &&
      email &&
      !emailValidation(email)
      && password &&
      !passwordValidation(password)) {

      let formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

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
                  <h1>Register</h1>
                  <p className="account-subtitle">Access to our dashboard</p>
                  {/* Form */}
                  <form onSubmit={handlerRegister}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button className="btn btn-primary w-100" type="submit">
                        Register
                      </button>
                    </div>
                  </form>
                  {/* /Form */}
                  <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">or</span>
                  </div>
                  {/* Social Login */}
                  <div className="social-login">
                    <span>Register with</span>
                    <a href="#" className="facebook">
                      <i className="fa fa-facebook" />
                    </a>
                    <a href="#" className="google">
                      <i className="fa fa-google" />
                    </a>
                  </div>
                  {/* /Social Login */}
                  <div className="text-center dont-have">
                    Already have an account?{" "}
                    <Link to="/admin/login">Login</Link>
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
        show={showALert}
        type={type}
      />
    </>
  );
};

export default Register;
