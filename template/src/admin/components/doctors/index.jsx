/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import SidebarNav from "../sidebar";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from "react-router-dom";
import ButtonOne from "../Buttons/ButtonOne";
import { setDoctors } from '../../../store/Doctors/doctors';
const Doctors = ({ backendUrl }) => {
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const doctoers = useSelector(state => state.doctors);

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
  console.log("doctoers>>", doctoers);
  const deleteDoctors = async (id) => {
    await axios.delete(`https://${backendUrl}/admin/doctors/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    
    }).then(() => {
      getDoctors();
    
    }).catch((err) => {
      console.log(err);
    })
  }

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
            record?.specialties?.map((item) => {
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
    {

      title: "Action",
      className: "text-end",
      dataIndex: "",
      render: (text, record) => (
        <div className="text-end" key={record.id}>
          <Link
            to={`/admin/doctor-edit/${record.id}`}
            className="me-1 btn btn-sm bg-success-light "
            data-bs-toggle="modal"
            data-bs-target="#edit_specialities_details"
          >
            <i className="fe fe-pencil"></i> Edit
          </Link>
          <a
            onClick={() => deleteDoctors(record.id)}
            className="me-1 btn btn-sm bg-danger-light"
            data-bs-toggle="modal"
            data-bs-target="#delete_modal"
          >
            <i className="fe fe-trash"></i> Delete
          </a>
        </div>
      ),
      sorter: (a, b) => a.length - b.length,
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
