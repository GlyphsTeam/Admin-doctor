import React from "react";
import SidebarNav from "../sidebar";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import DoctorListDesboard from "./DoctorList";
import PatientsListDesboard from "./PatientsList";
import AppointmentList from "./AppointmentList";
import StatusCharts from "./StatusCharts";
import CardDashboard from "./cardDashboard";

const Dashboard = () => {
  const dataCards = [
    {
      name: "Doctors",
      total: 168,
      color: "primary"
    },
    {
      name: "Patients",
      total: 487,
      color: "success"
    },
    {
      name: "Appointment",
      total: 485,
      color: "danger"
    }
  ]
  return (
    <>
      <div className="main-wrapper">
        <SidebarNav />
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid pb-0">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Welcome Admin!</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              {dataCards.map((info, index) => {
                return <CardDashboard
                  color={info.color}
                  name={info.name}
                  total={info.total}
                  key={`cardDash_${index}`} />
              })}

            </div>
            <div className="row">

              <div className="col-md-12 col-lg-6">
                {/* Invoice Chart */}
                <div className="card card-chart">
                  <div className="card-header">
                    <h4 className="card-title">Status</h4>
                  </div>
                  <div className="card-body">
                    <div id="morrisLine" />
                    {/* <LineChart /> */}
                    {/* <StatusChart /> */}
                    <StatusCharts />
                  </div>
                </div>
                {/* /Invoice Chart */}
              </div>
            </div>

            <div className="row">
              <DoctorListDesboard />
              <PatientsListDesboard />
            </div>
            {/* Today’s  Appointment */}
            <div className="row">
              <AppointmentList />
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
    </>
  );
};

export default Dashboard;
