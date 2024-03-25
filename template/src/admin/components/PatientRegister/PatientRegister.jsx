/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import loginBanner from "../../assets/images/login-banner.png";
import loginBanner from "../../assets/img/login-banner.png";
import Header from "../header";
import FormRegsiter from "./FormRegsiter";

const Register = (props) => {
  const [patientRegister, setPatientsRegister] = useState(true);
  const [patientRegisterOne, setPatientsRegisterOne] = useState(false);
  const [registerTwo, setRegisterTwo] = useState(false);

  useEffect(() => {
    document.body.classList.add("account-page");

    return () => document.body.classList.remove("account-page");
  }, []);

  const handlerPatientRegister = (status) => {
    setPatientsRegister(status);
  };
  const handlerPatientRegisterOne = (status) => {
    setPatientsRegisterOne(status)
  }
  const handlerPatientTwo = (status) => {
    setRegisterTwo(status)
  };
  return (
    <>
      <Header {...props} />

      <>
        {/* Page Content */}
        <div className="content top-space">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                {/* Register Content */}
                <div className="account-content">
                  <div className="row align-items-center justify-content-center">
                    {patientRegister && <div className="col-md-7 col-lg-6 login-left">
                      <img
                        src={loginBanner}
                        className="img-fluid"
                        alt="Doccure Register"
                      />
                    </div>}
                    <div className="col-md-12 col-lg-6 login-right">
                      {patientRegister && <div className="login-header">
                        <h3>
                          Patient Register{" "}
                          <Link to="/doctor/doctor-register">
                            Are you a Doctor?
                          </Link>
                        </h3>
                      </div>}
                      {/* Register Form */}
                      <FormRegsiter
                        backendUrl={props.backendUrl}
                        handlerPatientRegisterOne={handlerPatientRegisterOne}
                        handlerPatientTwo={handlerPatientTwo}
                        handlerPatientRegister={handlerPatientRegister}
                        patientRegisterOne={patientRegisterOne}
                        registerTwo={registerTwo}
                        patientRegister={patientRegister}
                      />
                      {/* /Register Form */}
                    </div>
                  </div>
                </div>
                {/* /Register Content */}
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </>

    </>
  );
};

export default Register;
