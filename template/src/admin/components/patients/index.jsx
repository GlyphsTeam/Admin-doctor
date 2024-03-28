/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import SidebarNav from "../sidebar";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import axios from 'axios';
import { setPatients } from '../../../store/Patients/patients';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from "react-router-dom";
import ButtonOne from "../Buttons/ButtonOne";

const Patients = ({ backendUrl }) => {
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const patientsState = useSelector((state) => state.patients);

  const getPatients = async () => {
    await axios.get(`https://${backendUrl}/admin/patients`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }

    }).then((res) => {

      dispatch(setPatients(res.data?.data));

    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    if (patientsState?.patientsData === null) {
      getPatients();

    }
  }, []);

  const deletePatient = async (id) => {
    await axios.delete(`https://${backendUrl}/admin/patients/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }

    }).then(() => {
      getPatients();

    }).catch((err) => {
      console.log(err);
    })
  }

  const columns = [
    {
      title: "Patient Image",
      dataIndex: "Patient Image",
      render: (text, record) => (
        <>
          <img className="rounded-circle patientImage" src={record.image} />
        </>
      ),
      sorter: (a, b) => a.PatientName.length - b.PatientName.length,
    },
    {
      title: "Name",
      dataIndex: "Name",
      render: (text, record) => (
        <>
          <p>{record?.name}</p>
        </>
      ),
      sorter: (a, b) => a.PatientID.length - b.PatientID.length,
    },

    {
      title: "Gender",
      dataIndex: "Gender",
      render: (text, record) => <>
        <p>{record?.gender}</p>
      </>,
      sorter: (a, b) => a.Age.length - b.Age.length,
    },
    {
      title: "Email",
      dataIndex: "Email",
      render: (text, record) => <>
        <p>{record?.email}</p>
      </>,
      sorter: (a, b) => a.Address.length - b.Address.length,
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      render: (text, record) => <>
        <p>{record?.phone_number}</p>
      </>,
      sorter: (a, b) => a.Phone.length - b.Phone.length,
    },
    {

      title: "Type",
      className: "text-end",
      dataIndex: "",
      render: (text, record) => (
        <div className="text-end" key={record.id}>
          <Link
            to={`/admin/patient-edit/${record.id}`}
            className="me-1 btn btn-sm bg-success-light "
            data-bs-toggle="modal"
            data-bs-target="#edit_specialities_details"
          >
            <i className="fe fe-pencil"></i> Edit
          </Link>
          <a
            onClick={() => deletePatient(record.id)}
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
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">List of Patient</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">List of Patient</li>
                </ul>
              </div>
              <ButtonOne route="/admin/patient-register">
                Add a Patient
              </ButtonOne>
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
                        total: patientsState?.patientsData?.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      dataSource={patientsState?.patientsData}
                      rowKey={(record) => record.id}
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

export default Patients;
