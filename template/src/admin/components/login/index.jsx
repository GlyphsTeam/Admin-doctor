
import React, { useState } from "react";
import { logoWhite } from "../imagepath";
import { emailValidation } from "../../../helper/helper";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
import axios from "axios";
import { setAuth } from '../../../store/Auth/auth';
import { useDispatch } from 'react-redux'
// eslint-disable-next-line react/prop-types
const Login = ({ backendUrl }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
 console.log("backendUrl>>",backendUrl)

  const [count, setCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const showAlertMessage = (message, type) => {
    setCount(1);
    setShowAlert(true);
    setMessage(message);
    setType(type);
  };

  const handlerLogin = async (e) => {
    e.preventDefault();

    if (!password) {
      showAlertMessage("The Password field is requried", "warning");
    }
    if (emailValidation(email)) {
      showAlertMessage("The Email is not valid", "warning");
    }

    if (email === "") {
      showAlertMessage("The Email field is requried.", "warning");
    }

    if (email && !emailValidation(email) && password) {
      let formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);
      formData.append("guard", "admin");




      await axios.post(`https://arab-texas.com/api/login`, formData, {
        headers: {
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type":"multipart/form-data; boundary=<calculated when request is sent>"
        }
      }).then((res) => {
        dispatch(setAuth(true));
        setEmail("");
        setPassword("");
        localStorage.setItem("email",res?.data?.data?.email);
        localStorage.setItem("name", res.data?.data?.name);
        localStorage.setItem("access_token", res.data?.data?.token)
        localStorage.setItem("image", res.data?.data?.image)
        navigate("/admin");

        e.target.reset();
      }).catch((err) => {
        console.log(err)
      });

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
                  <h1>Login</h1>
                  <p className="account-subtitle">Access to our dashboard</p>
                  {/* Form */}
                  <form onSubmit={handlerLogin}>
                    <div className="form-group">
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                      <button className="btn btn-primary w-100" type="submit">
                        Login
                      </button>
                    </div>
                  </form>
                  {/* /Form */}
                  <div className="text-center forgotpass">
                    <Link to="/admin/forgotpassword">Forgot Password?</Link>
                  </div>
                  <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">or</span>
                  </div>
                  {/* Social Login */}
                  <div className="social-login">
                    <span>Login with</span>
                    <Link to="#" className="facebook">
                      <i className="fa fa-facebook" />
                    </Link>
                    <Link to="#" className="google">
                      <i className="fa fa-google" />
                    </Link>
                  </div>
                  {/* /Social Login */}
                  <div className="text-center dont-have">
                    Don’t have an account?{" "}
                    <Link to="/admin/register">Register</Link>
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

export default Login;
