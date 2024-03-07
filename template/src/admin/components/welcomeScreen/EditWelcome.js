/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SidebarNav from "../sidebar";
import Alert from "../Alert/Alert";
import Camera from '../../assets/icons/camera.svg'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Form = ({ backendUrl }) => {
    const { id } = useParams();
    const [count, setCount] = useState(0);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [image, setImage] = useState(null);
    const [imageChange, setImageChange] = useState(null);
    const [titleAr, setTitleAr] = useState("");
    const [titleEn, setTitlteEn] = useState("");
    const [descriptionAr, setDiscroptionAr] = useState("");
    const [descriptionEn, setDiscriptionEn] = useState("");
    const token = localStorage.getItem("access_token");

    const handlerGetEdit = async (id) => {
        await axios.get(`https://${backendUrl}/admin/welcome_screens/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }

        }).then((res) => {
            setTitleAr(res.data?.data.title_ar);
            setTitlteEn(res.data?.data.title_en);
            setDiscriptionEn(res.data?.data?.description_en);
            setDiscroptionAr(res.data?.data?.description_ar);
            setImage(res.data?.data?.image);

        }).catch((err) => console.log(err))
    }
    useEffect(() => {
        if (id) {
            handlerGetEdit(id)
        }
    }, [id])
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
            setImageChange(image)
            setImage(URL.createObjectURL(image));
        }
    }

    const handlerAddSpecialities = async (e) => {
        e.preventDefault();

        const titleEn = e.target.titleEn.value;
        const titleAr = e.target.titleAr.value;
        const descriptionAr = e.target.descriptionAr.value;
        const descriptionEn = e.target.descriptionEn.value;

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
            descriptionEn) {
            if (id) {
                let formData = new FormData();

                formData.append("title[en]", titleEn);
                formData.append("title[ar]", titleAr);
                formData.append("description[en]", descriptionEn);
                formData.append("description[ar]", descriptionAr);

                imageChange && formData.append("image", imageChange);

                await axios.post(`https://${backendUrl}/admin/welcome_screens/${id}`, formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }).then((res) => {
                    setImage(null);
                    e.target.reset();

                }).catch((err) => {
                    console.log(err);
                    showAlertMessage("There is a problem in the server", "warning");

                })
            }

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
                            <h5 className="mb-3">Edit Welcome</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <form onSubmit={handlerAddSpecialities} encType="multipart/form-data">
                                        <div className="form-group form-focus">
                                            <div className="input-placeholder passcode-wrap mail-box">
                                                <label className="focus-label">
                                                    Title Arabic <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control floating" name="titleAr" defaultValue={titleAr} />
                                            </div>
                                        </div>
                                        <div className="form-group form-focus">
                                            <div className="input-placeholder passcode-wrap mail-box">
                                                <label className="focus-label">
                                                    Title English <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control floating" name="titleEn" defaultValue={titleEn} />
                                            </div>
                                        </div>
                                        <div className="form-group form-focus">
                                            <div className="input-placeholder passcode-wrap mail-box">
                                                <label className="focus-label">
                                                    description Arabic <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control floating" name="descriptionAr" defaultValue={descriptionAr} />
                                            </div>
                                        </div>
                                        <div className="form-group form-focus">
                                            <div className="input-placeholder passcode-wrap mail-box">
                                                <label className="focus-label">
                                                    description English <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control floating" name="descriptionEn" defaultValue={descriptionEn} />
                                            </div>
                                        </div>
                                        <div className="profile-pic-upload d-flex flex-wrap justify-content-center">
                                            <div className="cam-col">
                                                <img src={image ? image : Camera} alt="camera" />
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
