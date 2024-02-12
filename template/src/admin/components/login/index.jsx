import React, { useRef, useState } from "react";
import { logoWhite } from "../imagepath";
import { emailValidation } from "../../../helper/helper";
import { Link } from "react-router-dom";
import Alert from "../Alert/Alert";
const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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

  const handlerLogin = (e) => {
    e.preventDefault();

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (!passwordValue) {
      showAlertMessage("The Password field is requried", "warning");
    }
    if (emailValidation(emailValue)) {
      showAlertMessage("The Email is not valid", "warning");
    }

    if (emailValue === "") {
      showAlertMessage("The Email field is requried.", "warning");
    }

    if (emailValue && !emailValidation(emailValue) && passwordValue) {
      let formData = new FormData();

      formData.append("email", emailValue);
      formData.append("password", passwordValue);
    }
  }
  // const [shouldReload, setShouldReload] = useState(true);

  // useEffect(() => {
  //   if (shouldReload) {
  //     window.location.reload();
  //     setShouldReload(false);
  //   }
  // }, [shouldReload]);
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
                        ref={emailRef}
                        className="form-control"
                        type="text"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        ref={passwordRef}
                        className="form-control"
                        type="text"
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
