/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SidebarNav from "../sidebar";
import FeatherIcon from "feather-icons-react";
import Alert from "../Alert/Alert";
import Camera from '../../assets/icons/camera.svg'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Form = ({ backendUrl }) => {
    const { id } = useParams();
    const [count, setCount] = useState(0);
    const [type, setType] = useState("");
    const [typeSlider, setTypeSlider] = useState("");
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [changeImage, setChangeImage] = useState(null);
    const [titleEn, setTitlteEn] = useState("");
    const [typeSocial, setSocialType] = useState("");

    const token = localStorage.getItem("access_token");
    const navigation = useNavigate();

    const handlerGetEdit = async (id) => {
        await axios.get(`https://${backendUrl}/admin/social_media/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }

        }).then((res) => {
            console.log("res>>", res.data)
            setTitlteEn(res.data?.data.link);

            setSocialType(res.data?.data?.type);

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


    const handlerAddSpecialities = async (e) => {
        e.preventDefault();

        const titleEn = e.target.titleEn.value;
        const typeSlider = e.target.type.value;




        if (!titleEn) {
            showAlertMessage("The Title English Name is requried", "warning");
        }

        if (titleEn
        ) {
            if (id) {

                let formData = new FormData();
                formData.append("link", titleEn);
                typeSlider && formData.append("type", typeSlider)
                changeImage && formData.append("image", changeImage)

                await axios.post(`https://${backendUrl}/admin/social_media/${id}`, formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }).then(() => {

                    e.target.reset();
                    navigation("/admin/social")

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
                            <h5 className="mb-3">Edit Social Media</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <form onSubmit={handlerAddSpecialities}>
                                        <div className="form-group form-focus">
                                            <div className="input-placeholder passcode-wrap mail-box">
                                                <label className="focus-label">
                                                    URL <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control floating" name="titleEn" defaultValue={titleEn} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label">
                                                Type
                                            </label>
                                            <div className="col-lg-9">
                                                <select className="form-select" name="type" defaultValue={typeSocial}>
                                                    <option value={"facebook"}>Facebook </option>
                                                    <option value={"twitter"}>Twitter</option>
                                                    <option value={"tiktok"}>TikTok  </option>
                                                    <option value={"instagram"}>Instagram</option>
                                                    <option value={"youtube"}>YouTube</option>
                                                    <option value={"pinterest"}>Pinterest</option>
                                                </select>
                                            </div>
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
