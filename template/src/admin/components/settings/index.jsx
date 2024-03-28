/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import SidebarNav from "../sidebar";
import { Link } from "react-router-dom";
import axios from 'axios';
import { setSettingData } from '../../../store/Setting/setting'
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../Alert/Alert';
import Loading from '../Loading/Loading';

const Settings = ({ backendUrl }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [count, setCount] = useState(0);
  const settingState = useSelector((state) => state.setting);
  const [loading, setLoading] = useState(false);
  
  const getSettings = async () => {
    const token = localStorage.getItem("access-token");
    await axios.get(`https://${backendUrl}/general_setting`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      dispatch(setSettingData(res.data?.data))

    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    if (!settingState.settingData) {
      getSettings();
    }
  }, []);

  const showAlertWithMessage = (message, alertType) => {
    setCount(1);
    setMessage(message);
    setShowAlert(true);
    setType(alertType);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = [
      { value: e.target.website.value, message: "Website Name", formFeild: "site_name[en]" },
      { value: e.target.app.value, message: "App Name", formFeild: "app_name[en]" },
      { value: e.target.phone.value, message: "Phone Number", formFeild: "phone_number" },
      { value: e.target.email.value, message: "Email", formFeild: "email" },
      { value: e.target.address.value, message: "Address", formFeild: "address[en]" },
      { value: e.target.latitude.value, message: "Latitude", formFeild: "latitude" },
      { value: e.target.longitude.value, message: "Longitude", formFeild: "longitude" },
      { value: e.target.main.value, message: "Main Color", formFeild: "main_color" },
      { value: e.target.secondary.value, message: "Secondary Color", formFeild: "secondary_color" },
      { value: e.target.tertiary.value, message: "Tertiary Color", formFeild: "color_tertiary" },
      { value: e.target.android.value, message: "Android URL", formFeild: "android_url" },
      { value: e.target.ios.value, message: "iOS URL", formFeild: "ios_url" }
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

    try {
      await axios.post(`https://${backendUrl}/admin/general_setting`, formData, {
        headers: { "Authorization": `Bearer ${token}` }

      }).then(() => {

        getSettings();
        showAlertWithMessage("Successfully updated settings.", "success")

      })
    } catch (err) {
      console.log(err);
      showAlertWithMessage("Failed to update settings.", "warnning");

    }
  }
  return (
    <>
      {loading && <Loading />}

      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">General Settings</h3>
                <div className='settingFlex'>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Settings</a>
                    </li>
                    <li className="breadcrumb-item active">General Settings</li>
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
                      <label>Website Name</label>
                      <input type="text" name="website" id='website' className="form-control" defaultValue={settingState.settingData?.site_name} />
                    </div>
                    <div className="form-group">
                      <label>app Name</label>
                      <input type="text" name='app' id='app' className="form-control" defaultValue={settingState.settingData?.app_name} />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="text" name="phone" id='phone' className="form-control" defaultValue={settingState.settingData?.phone_number} />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" name="email" id="email" className="form-control" defaultValue={settingState.settingData?.email} />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" name='address' id='address' className="form-control" defaultValue={settingState.settingData?.address} />
                    </div>
                    <div className="form-group">
                      <label>Latitude</label>
                      <input type="text" name='latitude' id='latitude' className="form-control" defaultValue={settingState.settingData?.latitude} />
                    </div>
                    <div className="form-group">
                      <label>Longitude</label>
                      <input type="text" name='longitude' id="longitude" className="form-control" defaultValue={settingState.settingData?.longitude} />
                    </div>
                    <div className="form-group">
                      <label>Main Color</label>
                      <input type="text" name='main' id='main' className="form-control" defaultValue={settingState.settingData?.main_color} />
                    </div>
                    <div className="form-group">
                      <label>Secondary Color</label>
                      <input type="text" name='secondary' id='secondary' className="form-control" defaultValue={settingState.settingData?.secondary_color} />
                    </div>
                    <div className="form-group">
                      <label>Tertiary Color</label>
                      <input type="text" name="tertiary" id="tertiary" className="form-control" defaultValue={settingState.settingData?.color_tertiary} />
                    </div>
                    <div className="form-group">
                      <label>Android Url</label>
                      <input type="text" name="android" id="android" className="form-control" defaultValue={settingState.settingData?.android_url} />

                    </div>
                    <div className="form-group mb-0">
                      <label>IOS Url</label>
                      <input type="text" name="ios" id="ios" className="form-control" defaultValue={settingState.settingData?.ios_url} />

                      <br />
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
export default Settings;