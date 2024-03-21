/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import SidebarNav from "../sidebar";
import { Link } from "react-router-dom";
import axios from 'axios';


const Message = ({ backendUrl }) => {
  const [welcome, setWelcome] = useState([]);
  const token = localStorage.getItem("access_token");

  const deleteMessage = async (id) => {
    await axios.delete(`https://${backendUrl}/admin/contact_us/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }).then(() => {
      getMessages();

    }).catch((err) => console.log(err));
  }

  const getMessages = async () => {
    await axios.get(`https://${backendUrl}/admin/contact_us`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      setWelcome(res.data?.data)

    }).catch((err) => console.log(err))
  }
  useEffect(() => {

    getMessages();
  }, []);


  const columns = [
    {
        title: "Name",
        dataIndex: "social",
        render: (text, record) => (
          <>
            
            <p >{record?.name}</p>
          </>
        ),
        sorter: (a, b) => a.record.length - b.record.length,
      },
      {
        title: "Email",
        dataIndex: "social",
        render: (text, record) => (
          <>
            
            <p >{record?.email}</p>
          </>
        ),
        sorter: (a, b) => a.record.length - b.record.length,
      },
      {
        title: "Phone Number",
        dataIndex: "social",
        render: (text, record) => (
          <>
            
            <p >{record?.phone_number}</p>
          </>
        ),
        sorter: (a, b) => a.record.length - b.record.length,
      },
      {
        title: "Message",
        dataIndex: "social",
        render: (text, record) => (
          <>
            
            <p >{record?.message}</p>
          </>
        ),
        sorter: (a, b) => a.record.length - b.record.length,
      },
    {

      title: "Type",                                                                                                             
      className: "text-end",
      dataIndex: "",
      render: (text, record) => (
        <div className="text-end" key={record.id}>
          <Link
            to={`/admin/edit-social/${record.id}`}
            className="me-1 btn btn-sm bg-success-light "
            data-bs-toggle="modal"
            data-bs-target="#edit_specialities_details"
          >
            <i className="fe fe-pencil"></i> Edit
          </Link>
          <a
            onClick={() => deleteMessage(record.id)}
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
              <div className="col-sm-7 col-aut0">
                <h3 className="page-title">Welcome</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Welcome</li>
                </ul>
              </div>
              <div className="col-sm-5 col">
                <Link
                  to="/admin/add-social"
                  data-bs-toggle="modal"
                  className="btn btn-primary float-end mt-2"
                >
                  Add
                </Link>
              </div>
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
                        total: welcome?.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      dataSource={welcome}
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
      <div
        className="modal fade"
        id="edit_specialities_details"
        aria-hidden="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Welcome</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="row form-row">
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Welcome</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Cardiology"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Image</label>
                      <input type="file" className="form-control" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="delete_modal"
        aria-hidden="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-content p-2">
                <h4 className="modal-title">Delete</h4>
                <p className="mb-4">Are you sure want to delete?</p>
                <button type="button" className="btn btn-primary mx-1">
                  Save{" "}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="Add_Specialities_details"
        aria-hidden="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Specialities</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="row form-row">
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Specialities</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Image</label>
                      <input type="file" className="form-control" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
