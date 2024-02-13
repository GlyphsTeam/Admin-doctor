/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SidebarNav from "../sidebar";
import FeatherIcon from "feather-icons-react";
import Alert from "../Alert/Alert";
import Camera from '../../assets/icons/camera.svg'

const Form = () => {
    const [count, setCount] = useState(0);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [image, setImage] = useState(null);



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


    const handlerAddSpecialities = (e) => {
        e.preventDefault();

        const specialiteValue = e.target.specialite.value;

        if (!image) {
            showAlertMessage("The Image field is requried", "warning");
        }
        if (!specialiteValue) {
            showAlertMessage("The Specialite Name is requried", "warning");
        }

        if (specialiteValue && image) {
            let formData = new FormData();

            formData.append("name", specialiteValue);
            formData.append("image", image);

            setImage(null);
            e.target.reset();
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
                                                    Specialite Name <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control floating" name="specialite" />
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
