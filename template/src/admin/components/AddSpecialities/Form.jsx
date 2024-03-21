/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SidebarNav from "../sidebar";
import Alert from "../Alert/Alert";
import Camera from '../../assets/icons/camera.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = ({ backendUrl }) => {
    const [count, setCount] = useState(0);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [image, setImage] = useState(null);
    const navigation = useNavigate();
    const token = localStorage.getItem("access_token");




    const showAlertMessage = (message, type) => {
        setCount(1);
        setType(type);
        setMessage(message);
        setShowAlert(true);
    }
    const handlerUpload = (e) => {
        const image = e.target.files[0];

        if (image?.type !== 'image/jpeg' &&
            image?.type !== 'image/png' &&
            image?.type !== 'image/jpg') {
            showAlertMessage("The Image must be jpeg or png or jpg", "warning");
        }
        else {
            setImage(image);
        }
    }


    const handlerAddSpecialities = async (e) => {
        e.preventDefault();

        const specialiteValueEn = e.target.specialiteEn.value;
        const specialiteValueAr = e.target.specialiteAr.value;


        if (!image) {
            showAlertMessage("The Image field is requried", "warning");
        }
   
        if (!specialiteValueAr) {
            showAlertMessage("The specialite Arabic Name is requried", "warning");
        }
        if (!specialiteValueEn) {
            showAlertMessage("The specialite English Name is requried", "warning");
        }
        if (specialiteValueEn && image && specialiteValueAr) {
            let formData = new FormData();

            formData.append("name[en]", specialiteValueEn);
            formData.append("name[ar]", specialiteValueAr);
            formData.append("image", image);

            await axios.post(`https://${backendUrl}/admin/specialties`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }

            }).then(() => {

                setImage(null);
                e.target.reset();
                navigation("/admin/specialities");
            }).catch((err) => {
                console.log(err);
            })


        }

    }



    return (
        <>
            <SidebarNav />
            {/* Page Wrapper */}
            <div className="page-wrapper">
                <div className="content container-fluid">
                    {/* Add Blog */}
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-3">Add a New Specialities</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <form onSubmit={handlerAddSpecialities}>
                                        <div className="form-group form-focus">
                                            <div className="input-placeholder passcode-wrap mail-box">
                                                <label className="focus-label">
                                                    Specialite Name (En) <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control floating" name="specialiteEn" />
                                            </div>
                                        </div>
                                        <div className="form-group form-focus">
                                            <div className="input-placeholder passcode-wrap mail-box">
                                                <label className="focus-label">
                                                    Specialite Name (Ar) <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control floating" name="specialiteAr" />
                                            </div>
                                        </div>
                                        <div className="profile-pic-upload d-flex flex-wrap justify-content-center">
                                            <div className="cam-col">
                                                <img src={image ? URL.createObjectURL(image) : Camera} alt="camera" />
                                            </div>
                                            <input
                                                type="file"
                                                id="quali_certificate"
                                                onChange={(e) => handlerUpload(e)}
                                                name="quali_certificate"
                                            />
                                        </div>                                    <button type="submit" className="btn btn-primary save-btn">
                                            Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Add Blog */}
                </div>
            </div>
            {/* /Page Wrapper */}
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

export default Form;
