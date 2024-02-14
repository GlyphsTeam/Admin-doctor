import React, { useState } from "react";
// import loginBanner from '../../assets/images/login-banner.png';
import Logo from "../../assets/img/logo.png";
import camera from "../../assets/icons/camera.svg";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setImgProfile } from '../../../store/PatientRegister/patient';
import Alert from '../Alert/Alert';

const Patientregisterstepone = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const registerState = useSelector((state) => state.patient);

  const [count, setCount] = useState(0);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);


  const hanlderRegister = (e) => {
  e.preventDefault();

    history.push("/admin/patientregisterstep-2");
  }
  const handlerUploadImage = (e) => {

    let image = e.target.files[0];

    if (!image.type.startsWith('image/')) {
      setCount(1);
      setType("warning");
      setMessage("Please upload only images.");
      setShowAlert(true);
    }
    else {
      dispatch(setImgProfile(image));
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
                        <img src={registerState?.imgProfile ? URL.createObjectURL(registerState?.imgProfile) : Logo} alt="" />
                      </div>
                      <div className="step-list">
                        <ul>
                          <li>
                            <Link to="#" className="active">
                              1
                            </Link>
                          </li>
                          <li>
                            <Link to="#">2</Link>
                          </li>
                          <li>
                            <Link to="#">3</Link>
                          </li>
                        </ul>
                      </div>
                      <form onSubmit={hanlderRegister}>
                        <div className="profile-pic-col">
                          <h3>Profile Picture</h3>
                          <div className="profile-pic-upload">
                            <div className="cam-col">
                              <img
                                src={camera}
                                id="prof-avatar"
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                            <span>Upload Profile Picture</span>
                            <input
                              type="file"

                              onChange={(e) => handlerUploadImage(e)}
                            />
                          </div>
                        </div>
                        <div className="mt-5">
                          <button
                            // onClick={() => hanlderRegister()}
                            className="btn btn-primary w-100 btn-lg login-btn step1_submit"
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

export default Patientregisterstepone;
