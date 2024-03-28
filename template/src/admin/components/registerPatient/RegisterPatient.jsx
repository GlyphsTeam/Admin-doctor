/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
// import FeatherIcon from "feather-icons-react";
import SidebarNav from "../sidebar";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import male from "../../assets/icons/male.png";
import female from "../../assets/icons/female.png";
import Alert from "../Alert/Alert";
import axios from 'axios'
// import { v4 as uuidv4 } from 'uuid';

const AddPatient = ({ backendUrl }) => {
    const [selectedDate1, setSelectedDate1] = useState(new Date());
    const [image, setImage] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [questionsIds, setQuestionsIds] = useState([]);

    const navgation = useNavigate();

    const [count, setCount] = useState(0);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const handleDateChange1 = (date) => {
        setSelectedDate1(date);
    };
    const getQuestions = async () => {
        await axios.get(`https://${backendUrl}/medical_conditions`).then((res) => {
            console.log("resS", res.data)
            setQuestions(res.data?.data);

        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        if (!questions) {
            getQuestions();
        }
    }, []);

    const addIdsQuestions = (id, checked) => {
        if (checked) {
            setQuestionsIds(prev => [...prev, id]);
        } else {
            setQuestionsIds(prev => prev.filter(item => item !== id));
        }
    };
    const showAlertWithMessage = (message, type) => {
        setCount(1);
        setType(type);
        setMessage(message);
        setShowAlert(true);
    }

    const handlerRegister = async (e) => {

        e.preventDefault();
        const fields = [
            { value: e.target.name.value, fieldName: "name", message: "Name" },
            { value: e.target.password.value, fieldName: "password", message: "Password" },
            { value: e.target.mobile.value, fieldName: "phone_number", message: "Phone Number" },
            { value: e.target.email.value, fieldName: "email", message: "Email" },
            { value: e.target.address.value, fieldName: "address", message: "Address" },
            { value: e.target.gender.value, fieldName: "gender", message: "Gender" },
            { value: e.target.height.value, fieldName: "height", message: "Height" },
            { value: e.target.weight.value, fieldName: "weight", message: "Weight" },
            { value: e.target.date.value, fieldName: "date_birth", message: "date" },
            { value: e.target.blood_group.value, fieldName: "blood_type", message: "ID Number" },
            { value: e.target.nationality.value, fieldName: "nationality", message: "Nationality" },
            { value: e.target.emergency.value, fieldName: "emergency_number", message: "emergency number" },
            { value: e.target.pregnant.value, fieldName: "pregnant", message: "pregnant" },
            { value: e.target.taking_medications.value, fieldName: "taking_medications", message: "taking medications" },
            { value: e.target.allergies.value, fieldName: "allergies", message: "allergies" },
            { value: e.target.city.value, fieldName: "city", message: "city" },
            { value: e.target.state.value, fieldName: "state", message: "state" },
            { value: e.target.zip_code.value, fieldName: "zip_code", message: "zipcode" },
            { value: e.target.age.value, fieldName: "age", message: "Age" },
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
        formData.append("image", image);
        questionsIds?.forEach((question, index) => {
            formData.append(`medical_conditions_list[${index}]`, question)
        })
        //   formData.append("certifcate", registerState.certifcate);
        //   formData.append("uploadImg", image);





        await axios.post(`https://${backendUrl}/admin/patients`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(() => {

            navgation("/admin/patient-list");
        }).catch((err) => {
            console.log(err)
            showAlertWithMessage(`There is a problem with server.`, "warning");

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
            setImage(image);
        }
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
                                                            <h5 className="modal-title">Patient Register</h5>
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
                                                                            {image && <div>
                                                                                <img className="imageProfile" src={image ? URL.createObjectURL(image) : ""} alt="image" />
                                                                            </div>}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>Create Password</label>
                                                                            <input
                                                                                type="password"
                                                                                className="form-control"
                                                                                id="password"
                                                                                name="password"
                                                                            />
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
                                                                                    defaultChecked=""
                                                                                    defaultValue="male"
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
                                                                            <label>Height</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                name="height"
                                                                                id="height"

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6 m-t-10">
                                                                        <div className="form-group">
                                                                            <label>Weight</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                name="weight"
                                                                                id="weight"

                                                                            />
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

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6 m-t-10">
                                                                        <div className="form-group">
                                                                            <label>Age</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                name="age"
                                                                                id="age"

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6 m-t-10">
                                                                        <div className="form-group">
                                                                            <label>Emergency Number</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                name="emergency"
                                                                                id="emergency"

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6 m-t-10">
                                                                        <div className="form-group">
                                                                            <label>Blood Type</label>
                                                                            <select
                                                                                className="form-select form-control"
                                                                                id="blood_group"
                                                                                name="blood_group"
                                                                                tabIndex={-1}
                                                                                // onChange={(e) => dispatch(setBloodType(e.target.value))}
                                                                                aria-hidden="true"
                                                                            >
                                                                                <option value="">Select your blood group</option>
                                                                                <option value="A-">A-</option>
                                                                                <option value="A+">A+</option>
                                                                                <option value="B-">B-</option>
                                                                                <option value="B+">B+</option>
                                                                                <option value="AB-">AB-</option>
                                                                                <option value="AB+">AB+</option>
                                                                                <option value="O-">O-</option>
                                                                                <option value="O+">O+</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6 m-t-10 checklist-col pregnant-col">
                                                                        {questions?.slice(0, 7)?.map((item) => {
                                                                            return <div className="remember-me-col d-flex justify-content-between" key={item.id}>
                                                                                <span className="mt-1">
                                                                                    {item?.title}
                                                                                </span>
                                                                                <label className="custom_check">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        value={item.id}
                                                                                        name="artery"
                                                                                        id="artery"
                                                                                        onChange={(e) => addIdsQuestions(item.id, e.target.checked)}

                                                                                    />
                                                                                    <span className="checkmark" />
                                                                                </label>
                                                                            </div>
                                                                        })}

                                                                    </div>
                                                                    <div className="col-12 col-sm-6 m-t-10 checklist-col pregnant-col">
                                                                        {questions?.slice(7)?.map((item) => {
                                                                            return <div className="remember-me-col d-flex justify-content-between" key={item.id}>
                                                                                <span className="mt-1">
                                                                                    {item?.title}
                                                                                </span>
                                                                                <label className="custom_check">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        value={item.id}
                                                                                        name="artery"
                                                                                        id="artery"
                                                                                        onChange={(e) => addIdsQuestions(item.id, e.target.checked)}

                                                                                    />
                                                                                    <span className="checkmark" />
                                                                                </label>
                                                                            </div>
                                                                        })}
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>Are you currently taking any medications? if yes, please list them.</label>
                                                                            <input
                                                                                type="text"
                                                                                name="taking_medications"
                                                                                id="taking_medications"
                                                                                className="form-control"

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>Do youhave any known allergies to medications or substances?</label>
                                                                            <input
                                                                                type="text"
                                                                                name="allergies"
                                                                                id="allergies"
                                                                                className="form-control"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>For female patients: Are you currently pregnant?</label>
                                                                            <select
                                                                                className="form-select form-control"
                                                                                id="pregnant"
                                                                                name="pregnant"
                                                                                tabIndex={-1}
                                                                                aria-hidden="true"
                                                                            // onChange={(e) => dispatch(setLocation(e.target.value))}
                                                                            >
                                                                                <option value="">Select </option>
                                                                                <option value={1}>Yes</option>
                                                                                <option value={0}>No</option>
                                                                            </select>
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
                                                                                id="address" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>City</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="city"
                                                                                name="city"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>State</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="state"
                                                                                name="state"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label>Zip Code</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="zip_code"
                                                                                name="zip_code"
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

export default AddPatient;