import React, { useEffect, useState } from "react";
// import loginBanner from '../../../assets/images/login-banner.png';
import Logo from "../../assets/img/logo.png";
import camera from "../../assets/icons/camera.svg";
import { Link, useNavigate } from "react-router-dom";
import { setImage } from '../../../store/DoctorRegister/register';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../Alert/Alert';

const Registerstepone = () => {
  const dispatch = useDispatch();
  const navgation = useNavigate();
  const imageUrl = useSelector((state) => state.register);
  const [count, setCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.classList.add("account-page");

    return () => document.body.classList.remove("account-page");
  }, []);

  const handlerRegister = (e) => {
    e.preventDefault();

    let image = e.target.files[0];

    if (!image.type.startsWith('image/')) {
      setCount(1);
      setShowAlert(true);
      setType("warning");
      setMessage("The image field is requried");
    }
    else {
      dispatch(setImage(image));
    }
  }
  const hanlderNextRegister = () => {
    if (!imageUrl.img.type.startsWith('image/')) {
      setCount(1);
      setShowAlert(true);
      setType("warning");
      setMessage("The image field is requried");
    }

    else {
      navgation("/admin/register-step-2");
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
                      <img src={imageUrl.img ? URL.createObjectURL(imageUrl.img) : Logo} alt="" />
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
                    <form id="profile_pic_form" >
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
                            id="profile_image"
                            name="profile_image"
                            onChange={handlerRegister}
                          />
                        </div>
                      </div>

                      <div className="mt-5">
                        <button
                          onClick={() => hanlderNextRegister()}
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

export default Registerstepone;
