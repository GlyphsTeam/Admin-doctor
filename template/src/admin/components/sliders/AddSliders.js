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

    const handlerAddSlider = async (e) => {
        e.preventDefault();

        const titleEn = e.target.titleEn.value;
        const titleAr = e.target.titleAr.value;
        const descriptionAr = e.target.descriptionAr.value;
        const descriptionEn = e.target.descriptionEn.value;
        const token = localStorage.getItem("access_token");
        const typeSlider = e.target.type.value;
        console.log("type>>>",typeSlider)

        if (!typeSlider) {
            showAlertMessage("The Type  field is required", "warning")
        }
        if (!image) {
            showAlertMessage("The Image field is requried", "warning");
        }
        if (!descriptionEn) {
            showAlertMessage("The Description in English is required", "warning");
        }
        if (!descriptionAr) {
            showAlertMessage("The  Description in Arabic is required", "warning");
        }
        if (!titleEn) {
            showAlertMessage("The Title English Name is requried", "warning");
        }
        if (!titleAr) {
            showAlertMessage("The Title Arabic Name is requried", "warning");
        }
        if (titleEn &&
            titleAr &&
            image &&
            descriptionAr &&
            descriptionEn &&
            typeSlider) {
            let formData = new FormData();

            formData.append("type", typeSlider);
            formData.append("title[en]", titleEn);
            formData.append("title[ar]", titleAr);
            formData.append("description[en]", descriptionEn);
            formData.append("description[ar]", descriptionAr);
            formData.append("image", image);

            await axios.post(`https://${backendUrl}/admin/sliders`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(() => {
                setImage(null);
                e.target.reset();
                navigation("/admin/slider")

            }).catch((err) => {
                console.log(err);
                showAlertMessage("There is a problem in the server", "warning");

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
                            <h5 className="mb-3">Add a New Silder</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <form onSubmit={handlerAddSlider}>
                                        <div className="form-group form-focus">
                                            <div className="input-placeholder passcode-wrap mail-box">
                                                <label className="focus-label">
                                                    Title Arabic <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control floating" name="titleAr" />
                                            </div>
                                        </div>
                                        <div className="form-group form-focus">
                                            <div className="input-placeholder passcode-wrap mail-box">
                                                <label className="focus-label">
                                                    Title English <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control floating" name="titleEn" />
                                            </div>
                                        </div>
                                        <div className="form-group form-focus">
                                            <div className="input-placeholder passcode-wrap mail-box">
                                                <label className="focus-label">
                                                    description Arabic <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control floating" name="descriptionAr" />
                                            </div>
                                        </div>
                                        <div className="form-group form-focus">
                                            <div className="input-placeholder passcode-wrap mail-box">
                                                <label className="focus-label">
                                                    description English <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control floating" name="descriptionEn" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label">
                                                Type
                                            </label>
                                            <div className="col-lg-9">
                                                <select className="form-select" name="type">
                                                    <option value={"app"}>App</option>
                                                    <option value={"web"}>Web</option>
                                                </select>
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
                                        </div>
                                        <button type="submit" className="btn btn-primary save-btn">
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
