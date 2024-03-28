/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// import FeatherIcon from "feather-icons-react";
import SidebarNav from "../sidebar";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import male from "../../assets/icons/male.png";
import female from "../../assets/icons/female.png";
import Alert from "../Alert/Alert";
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { IoMdClose } from "react-icons/io";

const Profile = ({ backendUrl }) => {
    const [selectedDate1, setSelectedDate1] = useState(new Date());
    const [image, setImage] = useState(null);
    const [imageChange, setImageChange] = useState(null);
    const [allSpeciales, setAllSpeciales] = useState(null);
    const [selectSpeical, setSelectSpeical] = useState([]);
    const [doctorInfo, setDoctorInfo] = useState(null);
    const navgation = useNavigate();
    const { id } = useParams();

    const [count, setCount] = useState(0);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [gender, setGender] = useState("");

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    const handleDateChange1 = (date) => {
        setSelectedDate1(date);
    };
    const showAlertWithMessage = (message, type) => {
        setCount(1);
        setType(type);
        setMessage(message);
        setShowAlert(true);
    }
    const getDoctorsById = async (id) => {
        const token = localStorage.getItem("access_token");
        await axios.get(`https://${backendUrl}/admin/doctors/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            setDoctorInfo(res.data.data);
            setSelectSpeical(res.data.data.specialties);
            setGender(res.data?.data?.gender)

        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        if (id) {
            getDoctorsById(id);
        }
    }, [id]);
    console.log("doctorInfo", doctorInfo)
    const handlerRegister = async (e) => {

        e.preventDefault();
        const fields = [
            { value: e.target.name.value, fieldName: "name", message: "Name" },
            { value: e.target.mobile.value, fieldName: "phone_number", message: "Phone Number" },
            { value: e.target.email.value, fieldName: "email", message: "Email" },
            { value: e.target.address.value, fieldName: "address", message: "Address" },
            { value: gender, fieldName: "gender", message: "Gender" },
            { value: e.target.date.value, fieldName: "date", message: "date" },
            { value: e.target.idnumber.value, fieldName: "id_number", message: "ID Number" },
            { value: e.target.nationality.value, fieldName: "nationality", message: "Nationality" },
            { value: e.target.cardnumber.value, fieldName: "cardNumber", message: "cardnumber" },
        ];

        for (const feild of fields) {
            if (!feild.value) {
                showAlertWithMessage(`The ${feild.message} field us required.`, "warning");
                return;
            }
        }

        let formData = new FormData();
        const token = localStorage.getItem("access_token");
        fields.forEach(feild => formData.append(feild.fieldName, feild.value));
        imageChange && formData.append("image", imageChange);


        //   formData.append("certifcate", registerState.certifcate);
        //   formData.append("uploadImg", image);


        selectSpeical && selectSpeical.forEach((item, index) => {
            formData.append(`specialization[${index}]`, item?.id);
        })
        formData.append("guard", "doctor");


        await axios.post(`https://${backendUrl}/admin/doctors/${id}`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(() => {

            navgation("/admin/doctor-list");
        }).catch((err) => {
            console.log(err)
            showAlertWithMessage(`There is a problem with server.`, "warning");

        })


    }


    const getSpecialeies = async () => {
        await axios.get(`https://${backendUrl}/specialties`).then((res) => {
            setAllSpeciales(res.data.data);

        }).catch((err) => {
            console.log(err);
        })
    }

    const handlerImage = (e) => {
        const image = e.target.files[0];

        if (image?.type !== 'image/jpeg' &&
            image?.type !== 'image/png' &&
            image?.type !== 'image/jpg') {
            showAlertWithMessage("The Image must be jpeg or png or jpg", "warning");
        }
        else {
            setImageChange(image)
            setImage(URL.createObjectURL(image));
        }
    }
    useEffect(() => {
        if (!allSpeciales) {
            getSpecialeies();
        }
    }, [])
    const handlerSpesial = (value) => {
        const specialte = allSpeciales?.find(item => item.id === parseInt(value));
        setSelectSpeical([...selectSpeical, {
            name: specialte?.name,
            id: value
        }]);
    }
    const handlerRemoveSpecial = (id) => {
        setSelectSpeical(prev => {
            return prev.filter(item => item.id !== id);
        });

    }
    return (
        <>
            <SidebarNav />
            {/* Page Wrapper */}
            <div className="page-wrapper">
                <div className="content container-fluid">
                    {/* Page Header */}

                    {/* /Page Header */}
                    <div className="row">
                        <div className="col-md-12">

                            <div className="tab-content profile-tab-cont">
                                {/* Personal Details Tab */}
                                <div className="tab-pane fade show active" id="per_details_tab">
                                    {/* Personal Details */}
                                    <div className="row">
                                        <div className="col-lg-12">

                                            {/* Edit Details Modal */}
                                            <div
                                                className=""
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
                                                            <h5 className="modal-title">Doctor Register</h5>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form onSubmit={handlerRegister}>
                                                                <div className="row form-row">
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>Name</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="name"
                                                                                name="name"
                                                                                defaultValue={doctorInfo?.name}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>Email</label>
                                                                            <input
                                                                                type="email"
                                                                                name="email"
                                                                                id="email"
                                                                                defaultValue={doctorInfo?.email}
                                                                                className="form-control"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <label>Date of Birth</label>
                                                                            <div className="cal-icon">
                                                                                {/* <input
                                          type="text"
                                          className="form-control datetimepicker"
                                          defaultValue="24-07-1983"
                                        /> */}
                                                                                <DatePicker
                                                                                    className="form-control"
                                                                                    name="date"
                                                                                    id="date"
                                                                                    defaultValue={doctorInfo?.date}
                                                                                    onChange={handleDateChange1}
                                                                                    selected={selectedDate1}
                                                                                    dateFormat="dd/MM/yyyy"
                                                                                    showDayMonthYearPicker
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>Mobile Number</label>
                                                                            <input
                                                                                type="text"
                                                                                id="mobile"
                                                                                name="mobile"
                                                                                defaultValue={doctorInfo?.phone_number}
                                                                                className="form-control"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>Image Profile</label>
                                                                            <input
                                                                                type="file"
                                                                                className="form-control"
                                                                                onChange={(e) => handlerImage(e)}
                                                                            />
                                                                            <div className="mt-3">
                                                                                <img className="imageProfile" src={image ? image : doctorInfo?.image} alt="image" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-start mt-2">
                                                                        <h4 className="mt-3">Select Your Gender</h4>
                                                                    </div>
                                                                    <div className="select-gender-col">
                                                                        <div className="genderFlex">
                                                                            <div className="pe-0">
                                                                                <input
                                                                                    type="radio"
                                                                                    id="test1"
                                                                                    name="gender"
                                                                                    checked={gender == "male"}
                                                                                    defaultValue="male"
                                                                                    onChange={handleGenderChange}
                                                                                />
                                                                                <label htmlFor="test1">
                                                                                    <span className="gender-icon">
                                                                                        <img src={male} alt="" />
                                                                                    </span>
                                                                                    <span>Male</span>
                                                                                </label>
                                                                            </div>
                                                                            <div className="ps-2">
                                                                                <input
                                                                                    type="radio"
                                                                                    id="test2"
                                                                                    name="gender"
                                                                                    defaultValue="female"
                                                                                    checked={gender == "female"}
                                                                                    onChange={handleGenderChange}


                                                                                />
                                                                                <label htmlFor="test2">
                                                                                    <span className="gender-icon">
                                                                                        <img src={female} alt="" />
                                                                                    </span>
                                                                                    <span>Female</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6 m-t-10">
                                                                        <div className="form-group">
                                                                            <label>Specialities</label>
                                                                            <select
                                                                                className="form-select form-control"
                                                                                id="specialities"
                                                                                name="specialities"
                                                                                tabIndex={-1}
                                                                                aria-hidden="true"
                                                                                onChange={(e) => handlerSpesial(e.target.value)}
                                                                            >
                                                                                <option value="">Select</option>

                                                                                {allSpeciales && allSpeciales?.map((item) => {
                                                                                    return <option value={item?.id} key={item?.id}>{item?.name}</option>

                                                                                })}

                                                                            </select>
                                                                            {selectSpeical && selectSpeical.map((item) => {
                                                                                return <div className="selectSpcialContanier" key={item?.id}>
                                                                                    <li >{item?.name}</li>
                                                                                    <IoMdClose onClick={() => handlerRemoveSpecial(item?.id)} className="closeBtn" />
                                                                                </div>
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6 m-t-10">
                                                                        <div className="form-group">
                                                                            <label>Nationality</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                name="nationality"
                                                                                id="nationality"
                                                                                defaultValue={doctorInfo?.nationality}

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6 m-t-10">
                                                                        <div className="form-group">
                                                                            <label>Doctor ID Number</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                name="idnumber"
                                                                                id="idnumber"
                                                                                defaultValue={doctorInfo?.id_number}

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6 m-t-10">
                                                                        <div className="form-group">
                                                                            <label>Residence Card Number (Validation)</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                name="cardnumber"
                                                                                id="cardnumber"

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <br />
                                                                    <div className="col-12 addressTitle">
                                                                        <h5 className="form-title">
                                                                            <span>Address</span>
                                                                        </h5>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <label>Address</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                name="address"
                                                                                defaultValue={doctorInfo?.address}
                                                                                id="address" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>City</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                defaultValue="Miami"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>State</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                defaultValue="Florida"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>Zip Code</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                defaultValue={22434}
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