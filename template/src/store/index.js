import { configureStore } from "@reduxjs/toolkit";
import profile from './Profile/profile';
import patients from './Patients/patients';
import doctors from './Doctors/doctors';
import specialities from "./Specialities/specialities";
import dashboard from './Dashboard/dashboard';
import appointments from './Appointments/appointments';
import setting from './Setting/setting';
import auth from './Auth/auth';


const store = configureStore({
  reducer: {
    profile: profile,
    patients: patients,
    doctors: doctors,
    specialities: specialities,
    dashboard: dashboard,
    appointments: appointments,
    setting: setting,
    auth: auth
  }
});


export default store;