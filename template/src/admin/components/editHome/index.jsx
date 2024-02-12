import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import SidebarNav from "../sidebar";

import { Link } from "react-router-dom";

const EditHome = () => {
 
  
  return (
    <>
      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Edit Home</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Edit Home</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Home</h4>
                </div>
                <div className="card-body">
                  <form action="#">
                    <div className="form-group row">
                      <label className="col-form-label col-lg-2">
                        Title
                      </label>
                      <div className="col-lg-10">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            aria-label="Title"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-lg-2">
                       Description
                      </label>
                      <div className="col-lg-10">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            aria-label="Description"
                            aria-describedby="basic-addon2"
                          />
                        </div>
                      </div>
                    </div>
                   
                 
                    <div className="form-group row mb-0">
                      <label className="col-form-label col-lg-2">
                        Background Image
                      </label>
                      <div className="col-lg-10">
                        <div className="input-group">
                          <input type="file" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHome;
