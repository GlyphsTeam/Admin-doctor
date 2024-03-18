/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import SidebarNav from "../sidebar";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import {
  doctor_thumb_01,
  doctor_thumb_02,
  doctor_thumb_03,
  doctor_thumb_04,
  doctor_thumb_05,
  doctor_thumb_06,
  doctor_thumb_07,
  doctor_thumb_08,
  doctor_thumb_09,
  doctor_thumb_10,
} from "../imagepath";
import { Link } from "react-router-dom";
import ButtonOne from "../Buttons/ButtonOne";
import { setDoctors } from '../../../store/Doctors/doctors';
const Doctors = ({ backendUrl }) => {
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const doctoers = useSelector(state => state.doctors);
  const data = [
    {
      id: 1,
      DoctorName: "Dr. Darren Elder",
      Speciality: "Dental ",
      Date: "11 Jun 2019",
      time: "4.50 AM",
      image: doctor_thumb_02,
      AccountStatus: "checkbox",
    },
    {
      id: 2,
      DoctorName: "Dr. Deborah Angel",
      Speciality: "Cardiology ",
      Date: "4 Jan 2018",
      time: "9.40 AM",
      image: doctor_thumb_03,
      AccountStatus: "checkbox",
    },
    {
      id: 3,
      DoctorName: "Dr. John Gibbs",
      Speciality: "Dental ",
      Date: "21 Apr 2018",
      time: "02.59 PM",
      image: doctor_thumb_09,
      AccountStatus: "checkbox",
    },
    {
      id: 4,
      DoctorName: "Dr. Katharine Berthold",
      Speciality: "Orthopaedics ",
      Date: "23 Mar 2019",
      time: "02.50 PM",
      image: doctor_thumb_06,
      AccountStatus: "checkbox",
    },
    {
      id: 5,
      DoctorName: "Dr. Linda Tobin",
      Speciality: "Neurology ",
      Date: "14 Dec 2018",
      time: "01.59 AM",
      image: doctor_thumb_07,
      AccountStatus: "checkbox",
    },
    {
      id: 6,
      DoctorName: "Dr. Marvin Campbell",
      Speciality: "Orthopaedics ",
      Date: "24 Jan 2019",
      time: "02.59 AM",
      image: doctor_thumb_05,
      AccountStatus: "checkbox",
    },
    {
      id: 7,
      DoctorName: "Dr. Olga Barlow",
      Speciality: "Dental ",
      Date: "15 Feb 2018",
      time: "03.59 AM",
      image: doctor_thumb_10,
      AccountStatus: "checkbox",
    },
    {
      id: 8,
      DoctorName: "Dr. Paul Richard",
      Speciality: "Dermatology ",
      Date: "11 Jan 2019",
      time: "02.59 AM",
      image: doctor_thumb_08,
      AccountStatus: "checkbox",
    },
    {
      id: 9,
      DoctorName: "Dr. Ruby Perrin",
      Speciality: "Dental ",
      Date: "14 Jan 2019",
      time: "02.59 AM",
      image: doctor_thumb_01,
      AccountStatus: "checkbox",
    },
    {
      id: 10,
      DoctorName: "Dr. Sofia Brient",
      Speciality: "Urology ",
      Date: "5 Jul 2019",
      time: "12.59 AM",
      image: doctor_thumb_04,
      AccountStatus: "checkbox",
    },
  ];
  const getDoctors = async () => {
    await axios.get(`https://${backendUrl}/admin/doctors`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      dispatch(setDoctors(res.data.data));

    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    if (doctoers.doctors == null) {
      getDoctors();
    }
  }, [])
  console.log("doctoers>>", doctoers)

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "DoctorName",
      render: (text, record) => (
        <>
          <Link className="avatar mx-2" to="/admin/profile">
            <img className="rounded-circle" src={record?.image} alt="imageProfile" />
          </Link>
          <Link to="/admin/profile">{record?.name}</Link>
        </>
      ),
      sorter: (a, b) => a.DoctorName.length - b.DoctorName.length,
    },
    {
      title: "Speciality",
      dataIndex: "Speciality",
      render: (text, record) => (
        <>
         {
          record?.specialties?.map((item)=>{
            return <li key={item?.id}>{item?.name}</li>
          })
         }
        </>
      )
    },
    // {
    //   title: "Member Since",
    //   render: (record) => (
    //     <>
    //       <span className="user-name">{record.Date}</span>
    //       <br />
    //       <span>{record.time}</span>
    //     </>
    //   ),
    //   sorter: (a, b) => a.length - b.length,
    // },

    {
      title: "Account Status",
      dataIndex: "AccountStatus",
      render: (text, record) => {
        return (
          <div className="status-toggle">
            <input
              id={`rating${record?.id}`}
              className="check"
              type="checkbox"
            //  checked={false}
            />
            <label
              htmlFor={`rating${record?.id}`}
              className="checktoggle checkbox-bg"
            >
              checkbox
            </label>
          </div>
        );
      },
      sorter: (a, b) => a.AccountStatus.length - b.AccountStatus.length,
    },
  ];
  return (
    <>
      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row register_doctor">
              <div className="col-sm-12">
                <h3 className="page-title">List of Doctors</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">List of Doctors</li>
                </ul>
              </div>
              <ButtonOne route="/admin/doctor-register" >
                Add a doctor
              </ButtonOne>
              {/* <Link to="/admin/doctor-register"><button className="add_doctor">Add a doctor</button></Link> */}
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      pagination={{
                        total: doctoers.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      dataSource={doctoers.doctors}
                      rowKey={(record) => record.id}
                    //  onChange={this.handleTableChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctors;
