/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import SidebarNav from "../sidebar";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

import Alert from '../Alert/Alert';


const Branches = ({ backendUrl }) => {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [count, setCount] = useState(0);

  const [image, setImage] = useState(null);
  const navgation = useNavigate();


  const showAlertWithMessage = (message, alertType) => {
    setCount(1);
    setMessage(message);
    setShowAlert(true);
    setType(alertType);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = [
      { value: e.target.nameAr.value, message: "Name Arabic", formFeild: "name[en]" },
      { value: e.target.nameEn.value, message: "Name English", formFeild: "name[en]" },
      { value: e.target.phone.value, message: "Phone Number", formFeild: "phone_number" },
      { value: e.target.email.value, message: "Email", formFeild: "email" },
      { value: e.target.addressEn.value, message: "Address English", formFeild: "address[en]" },
      { value: e.target.addressAr.value, message: "Address Arabic", formFeild: "address[ar]" },
      { value: e.target.latitude.value, message: "Latitude", formFeild: "latitude" },
      { value: e.target.longitude.value, message: "Longitude", formFeild: "longitude" },
    ];

    for (const field of fields) {
      if (!field.value) {
        showAlertWithMessage(`The ${field.message} field is required.`, "warning");
        return;
      }
    }
    const formData = new FormData();
    const token = localStorage.getItem("access_token");
    fields.forEach(field => formData.append(field.formFeild, field.value));
    formData.append("image", image)
    try {
      await axios.post(`https://${backendUrl}/admin/branches`, formData, {
        headers: { "Authorization": `Bearer ${token}` }

      }).then(() => {

        navgation("/admin/branches");

        showAlertWithMessage("Successfully updated settings.", "success")

      })
    } catch (err) {
      console.log(err);
      showAlertWithMessage("Failed to update settings.", "warnning");

    }
  }
  const handlerImage = (e) => {
    const image = e.target.files[0];

    if (image?.type !== 'image/jpeg' &&
      image?.type !== 'image/png' &&
      image?.type !== 'image/jpg') {
      showAlertWithMessage("The Image must be jpeg or png or jpg", "warning");
    }
    else {
      setImage(image);
    }
  }
  return (
    <>
      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title"> Branches</h3>
                <div className='settingFlex'>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Branches</a>
                    </li>
                    <li className="breadcrumb-item active"> Branches</li>
                  </ul>
                  {/* <button className='btn btn-sm bg-success-light'><i className='fe fe-pencil'></i>Edit</button> */}
                </div>
              </div>

            </div>
          </div>

          {/* /Page Header */}
          <div className="row">
            <div className="col-12">
              {/* General */}
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">General</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Name Arabic</label>
                      <input type="text" name="nameAr" id='nameAr' className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Name English</label>
                      <input type="text" name='nameEn' id='nameEn' className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="text" name="phone" id='phone' className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" name="email" id="email" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Address Arabic</label>
                      <input type="text" name='addressAr' id='addressAr' className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Address English</label>
                      <input type="text" name='addressEn' id='addressEn' className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Longitude</label>
                      <input type="text" name='longitude' id="longitude" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>latitude</label>
                      <input type="text" name='latitude' id='latitude' className="form-control" />
                    </div>


                    <div className="form-group mb-0">
                      <label>Image</label>
                      <input type="file" name="image" onChange={(e) => handlerImage(e)} id="image" className="form-control" />
                      <br />
                      {image && <div>
                        <img className="imageProfile m-b-15" src={image ? URL.createObjectURL(image) : ""} alt="image" />
                      </div>}
                    </div>
                    <button className="btn btn-primary save-btn">Submit</button>
                  </form>
                </div>
              </div>
              {/* /General */}
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
  )
}
export default Branches;