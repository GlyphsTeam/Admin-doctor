/* eslint-disable react/prop-types */
import React, { lazy, Suspense } from "react";
import config from "config";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import Loading from './components/Loading/Loading';
// import { Appcontext } from "../approuter";
// const Header = lazy(() => import("./components/header/index"));
const Dashboard = lazy(() => import("./components/dashboard"));
const EditHome = lazy(() => import("./components/editHome/index"));
const Appointments = lazy(() => import("./components/appointments"));
const Specialities = lazy(() => import("./components/specialities"));
const Doctors = lazy(() => import("./components/doctors"));
const Patients = lazy(() => import("./components/patients"));
const Reviews = lazy(() => import("./components/reviews"));
const Transaction = lazy(() => import("./components/transaction"));
const Settings = lazy(() => import("./components/settings/index"));
const InvoiceReport = lazy(() => import("./components/Reports/InvoiceReport/InvoiceReport"));
const ProductList = lazy(() => import("./components/productlist"));
const PharmacyList = lazy(() => import("./components/pharmacylist"));
const Categories = lazy(() => import("./components/pharmacylist/Categories"));
const Blog = lazy(() => import("./components/Blog/blog"));
const BlogDetails = lazy(() => import("./components/Blog/blogdetails"));
const AddBlog = lazy(() => import("./components/Blog/addblog"));
const EditBlog = lazy(() => import("./components/Blog/editblog"));
const PendingBlog = lazy(() => import("./components/Blog/pendingblog"));
const Profile = lazy(() => import("./components/profile/Profile"));
const Login = lazy(() => import("./components/login"));
const Register = lazy(() => import("./components/register"));
const ForgotPassword = lazy(() => import("./components/forgotpassword"));
const Error = lazy(() => import("./components/error404"));
const ErrorPage = lazy(() => import("./components/error500"));
const BasicInput = lazy(() => import("./components/forms/baiscinput"));
const FormInput = lazy(() => import("./components/forminput"));
const FormHorizontal = lazy(() => import("./components/formhorizontal"));
const FormVertical = lazy(() => import("./components/formvertical"));
const FormMask = lazy(() => import("./components/formask"));
const FormValidation = lazy(() => import("./components/formvalidation"));
const BlankPage = lazy(() => import("./components/blankpage"));
const Components = lazy(() => import("./components/component"));
const DataTables = lazy(() => import("./components/datatables"));
const BasicTables = lazy(() => import("./components/basictables"));
const ProductCategories = lazy(() => import("./components/productlist/ProductCategories"));
const InvoiceReportList = lazy(() => import("./components/Reports/InvoiceReport/InvoiceReportList"));
const DoctorRegister = lazy(() => import("./components/doctor-register/index"));
const Registerstepone = lazy(() => import("./components/doctor-register/registerstepone"));
const Registersteptwo = lazy(() => import("./components/doctor-register/registersteptwo"));
const AddSpecialities = lazy(() => import("./components/AddSpecialities/Form"));
const PatientRegister = lazy(() => import("./components/PatientRegister/PatientRegister"));
const Patientregisterstepone = lazy(() => import("./components/registerPatient/patientregistersPatienttepone"));
const Patientregistersteptwo = lazy(() => import("./components/registerPatient/patientregistersteptwo"));
const Patientregisterstepthree = lazy(() => import("./components/registerPatient/patientregisterstepthree"));
const Patientregisterstepfour = lazy(() => import("./components/registerPatient/patientregisterstepfour"));
const Patientregisterstepfive = lazy(() => import("./components/registerPatient/patientregisterstepfive"));

const Header = lazy(() => import("./components/header/index"));



const AppRouters = function () {
    // const [menu, setMenu] = useState(false);
    // const toggleMobileMenu = () => {
    //     setMenu(!menu);
    // };
    // const { isAuth, setIsAuth } = useContext(Appcontext);

    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter basename={`${config.publicPath}`}>
                <div >
                    {/* {isAuth !== "admin" && (
                        <Route
                            render={(props) => (
                                <Header {...props} onMenuClick={() => toggleMobileMenu()} />
                            )}
                        />
                    )} */}
                    <Header/>
                    <Routes>
                        <Route path="/admin/login" exact element={<Login />} />
                        <Route path="/admin/register" exact element={<Register />} />
                        <Route
                            path="/admin/forgotPassword"
                            exact
                            element={<ForgotPassword />}

                        />
                        <Route path="/admin" exact element={<Dashboard />} />
                        <Route
                            path="/admin/appointment-list"
                            exact
                            element={<Appointments />}
                        />
                        <Route
                            path="/admin/edithome"
                            exact
                            element={<EditHome />}
                        />
                        <Route
                          path="/*"
                          exact 
                          element={<Error/>}
                        />
                        <Route path="/admin/specialities" exact element={<Specialities />} />
                        <Route path="/admin/doctor-list" exact element={<Doctors />} />
                        <Route path="/admin/patient-list" exact element={<Patients />} />
                        <Route path="/admin/reviews" exact element={<Reviews />} />
                        <Route
                            path="/admin/transactions-list"
                            exact
                            element={<Transaction />}
                        />
                        <Route
                            path="/admin/add-specialities"
                            exact
                            element={<AddSpecialities />}
                        />
                        <Route
                            path="/admin/patient-register"
                            exact
                            element={<PatientRegister />}

                        />
                        <Route
                            path="/admin/patientregisterstep-1"
                            exact
                            element={<Patientregisterstepone />}
                        />
                        <Route
                            path="/admin/patientregisterstep-2"
                            exact
                            element={<Patientregistersteptwo />}
                        />
                        <Route
                            path="/admin/patientregisterstep-3"
                            exact
                            element={<Patientregisterstepthree />}
                        />
                        <Route
                            path="/admin/patientregisterstep-4"
                            exact
                            element={<Patientregisterstepfour />}
                        />
                        <Route
                            path="/admin/patientregisterstep-5"
                            exac
                            element={<Patientregisterstepfive />}
                        />
                        <Route
                            path="/admin/doctor-register"
                            exact
                            element={<DoctorRegister />}
                        />
                        <Route
                            path="/admin/registerstepone"
                            exact
                            element={<Registerstepone />}
                        />
                        <Route
                            path="/admin/register-step-2"
                            exact
                            element={<Registersteptwo />}
                        />

                        <Route path="/admin/settings" exact element={<Settings />} />
                        <Route path="/admin/invoicerepot" exact element={<InvoiceReport />} />
                        <Route path="/admin/invoice" exact element={<InvoiceReportList />} />
                        <Route path="/admin/blog" exact element={<Blog />} />
                        <Route path="/admin/blog-details" exact element={<BlogDetails />} />
                        <Route path="/admin/add-blog" exact element={<AddBlog />} />
                        <Route path="/admin/edit-blog" exact element={<EditBlog />} />
                        <Route path="/admin/pending-blog" exact element={<PendingBlog />} />
                        <Route path="/admin/profile" exact element={<Profile />} />
                        <Route path="/admin/product-list" exact element={<ProductList />} />
                        <Route path="/admin/pharmacy-list" exact element={<PharmacyList />} />
                        <Route path="/admin/pharmacy-category" exact element={<Categories />} />
                        {/* <Route path="/admin/invoice" exact component={Invoice} /> */}

                        <Route path="/admin/404" exact element={<Error />} />
                        <Route path="/admin/500" exact element={<ErrorPage />} />
                        <Route path="/admin/blank-page" exact element={<BlankPage />} />
                        <Route path="/admin/components" exact element={<Components />} />
                        <Route path="/admin/basic-input" exact element={<BasicInput />} />
                        <Route path="/admin/form-input-group" exact element={<FormInput />} />
                        <Route
                            path="/admin/form-horizontal"
                            exact
                            element={<FormHorizontal />}
                        />
                        <Route path="/admin/form-vertical" exact element={<FormVertical />} />
                        <Route path="/admin/form-mask" exact element={<FormMask />} />
                        <Route
                            path="/admin/form-validation"
                            exact
                            element={<FormValidation />}
                        />
                        <Route path="/admin/tables-basic" exact element={<BasicTables />} />
                        <Route path="/admin/data-tables" exact element={<DataTables />} />
                        <Route
                            path="/admin/product-category"
                            exact
                            element={<ProductCategories />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </Suspense>
    )
}


export default AppRouters;