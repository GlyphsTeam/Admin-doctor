/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// import FeatherIcon from "feather-icons-react";
import SidebarNav from "../sidebar";
import { Link } from "react-router-dom";
import axios from 'axios';
import { setProfileData } from '../../../store/Profile/profile';
import { useDispatch, useSelector } from 'react-redux';
import Alert from "../Alert/Alert";

const Profile = ({ backendUrl }) => {
  const token = localStorage.getItem("access_token");
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);

  const [count, setCount] = useState(0);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const [imageChange, setImageChange] = useState(null);

  const profileData = useSelector((state) => state.profile);


  const getProfile = async () => {
    await axios.get(`https://${backendUrl}/admin/profile`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      dispatch(setProfileData(res.data.data));

    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    if (!profileData.profileData) {
      getProfile();
    }
  }, [])
  const handlerEdit = () => {
    setEdit(!edit)
  }
  const showAlertMessage = (message, type) => {
    setCount(1);
    setType(type);
    setMessage(message);
    setShowAlert(true);
  }
  const handlerImage = (e) => {
    const image = e.target.files[0];

    if (image?.type !== 'image/jpeg' &&
      image?.type !== 'image/png' &&
      image?.type !== 'image/jpg') {
      showAlertMessage("The Image must be jpeg or png or jpg", "warning");
    }
    else {
      setImageChange(image);
      setImage(URL.createObjectURL(image));
    }
  }
  const handlerSubmit = async (e) => {
    e.preventDefault();

  }
  return (
    <>
      <SidebarNav />
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col">
                <h3 className="page-title">Admin Profile</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Profile</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <div className="profile-header">
                <div className="row align-items-center">
                  <div className="col-auto profile-image">
                    <a href="#">
                      <img
                        className="rounded-circle"
                        alt="User Image"
                        src={profileData.profileData?.image}
                      />
                    </a>
                  </div>
                  <div className="col ml-md-n2 profile-user-info">
                    <h4 className="user-name mb-0">{profileData.profileData?.name}</h4>
                    <h6 className="text-muted">{profileData.profileData?.email}</h6>

                    <div className="about-text">

                    </div>
                  </div>
                  {/* <div className="col-auto profile-btn">
                    <a className="btn btn-primary">
                      Edit
                    </a>
                  </div> */}
                </div>
              </div>
              <div className="profile-menu">
                <ul className="nav nav-tabs nav-tabs-solid">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-bs-toggle="tab"
                      href="#per_details_tab"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="tab"
                      href="#password_tab"
                    >
                      Password
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content profile-tab-cont">
                {/* Personal Details Tab */}
                <div className="tab-pane fade show active" id="per_details_tab">
                  {/* Personal Details */}
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title d-flex justify-content-between">
                            <span>Personal Details</span>
                            <a
                              className="edit-link"
                              data-bs-toggle="modal"
                              onClick={() => handlerEdit()}
                            >
                              <i className="fa fa-edit me-1" />
                              Edit
                            </a>
                          </h5>
                          <div className="row">
                            <p className="col-sm-2 text-muted text-sm-end mb-0 mb-sm-3">
                              Name
                            </p>
                            <p className="col-sm-10">{profileData.profileData?.name}</p>
                          </div>

                          <div className="row">
                            <p className="col-sm-2 text-muted text-sm-end mb-0 mb-sm-3">
                              Email
                            </p>
                            <p className="col-sm-10">{profileData.profileData?.email}</p>
                          </div>
                          <div className="row">
                            <p className="col-sm-2 text-muted text-sm-end mb-0 mb-sm-3">
                              Mobile
                            </p>
                            <p className="col-sm-10">{profileData.profileData?.phone_number}</p>
                          </div>

                        </div>
                      </div>
                      {/* Edit Details Modal */}
                      <div
                        className={`${edit ? "" : "modal fade"}`}
                        id="edit_personal_details"
                        aria-hidden="true"
                        role="dialog"
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Personal Details</h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              />
                            </div>
                            <div className="modal-body">
                              <form onSubmit={handlerSubmit}>
                                <div className="row form-row">
                                  <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                      <label> Name</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        defaultValue={profileData.profileData?.name}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                      <label>Image</label>
                                      <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) => handlerImage(e)}
                                      />
                                      <div>
                                        <img className="imageProfile" src={image ? image : profileData.profileData?.image} alt="image" />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                      <label>Email </label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        defaultValue={profileData.profileData?.email}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                      <label>Mobile</label>
                                      <input
                                        type="text"
                                        defaultValue={profileData.profileData?.phone_number}
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="submit"
                                  className="btn btn-primary w-100"
                                >
                                  Save Changes
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /Edit Details Modal */}
                    </div>
                  </div>
                  {/* /Personal Details */}
                </div>
                {/* /Personal Details Tab */}
                {/* Change Password Tab */}
                <div id="password_tab" className="tab-pane fade">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Change Password</h5>
                      <div className="row">
                        <div className="col-md-10 col-lg-6">
                          <form>
                            <div className="form-group">
                              <label>Old Password</label>
                              <input type="password" className="form-control" />
                            </div>
                            <div className="form-group">
                              <label>New Password</label>
                              <input type="password" className="form-control" />
                            </div>
                            <div className="form-group">
                              <label>Confirm Password</label>
                              <input type="password" className="form-control" />
                            </div>
                            <button className="btn btn-primary" type="submit">
                              Save Changes
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Change Password Tab */}
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
      {/* /Page Wrapper */}
    </>
  );
};

export default Profile;
