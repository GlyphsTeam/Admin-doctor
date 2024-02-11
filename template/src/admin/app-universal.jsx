/* eslint-disable react/prop-types */
import React, { useState, useContext, useMemo, lazy, Suspense } from "react";
import config from "config";

import { Route, BrowserRouter, Switch } from "react-router-dom";

import { Appcontext } from "../approuter";
const Header = lazy(() => import("./components/header/index"));
const Dashboard = lazy(() => import("./components/dashboard"));
const Appointments = lazy(() => import("./components/appointments"));
const Specialities = lazy(() => import("./components/specialities"));
const Doctors = lazy(() => import("./components/doctors"));
const Patients = lazy(() => import("./components/patients"));
const Reviews = lazy(() => import("./components/reviews"));
const Transaction = lazy(() => import("./components/transaction"));
const Settings = lazy(() => import("./components/transaction"));
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
const Lockscreen = lazy(() => import("./components/lockscreen"));
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
const Registerstepthree = lazy(() => import("./components/doctor-register/registerstepthree"));

const AppUniversal = function (props) {
  const [menu, setMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  const { isAuth, setIsAuth } = useContext(Appcontext);

  const location = props?.location;

  useMemo(() => {
    if (
      location?.pathname == "/admin/login" ||
      location?.pathname == "/admin/register" ||
      location?.pathname == "/admin/forgotPassword" ||
      location?.pathname == "/admin/lockscreen" ||
      location?.pathname == "/admin/conform-email" ||
      location?.pathname == "/admin/404" ||
      location?.pathname == "/admin/500"
    ) {
      setIsAuth("admin");
    } else {
      setIsAuth("user");
    }
  }, [location]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter basename={`${config.publicPath}`}>
        <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
          {isAuth !== "admin" && (
            <Route
              render={(props) => (
                <Header {...props} onMenuClick={() => toggleMobileMenu()} />
              )}
            />
          )}
          <Switch>
            <Route path="/admin/login" exact component={Login} />
            <Route path="/admin/register" exact component={Register} />
            <Route
              path="/admin/forgotPassword"
              exact
              component={ForgotPassword}
            />
            <Route path="/admin/lockscreen" exact component={Lockscreen} />
            <Route path="/admin" exact component={Dashboard} />
            <Route
              path="/admin/appointment-list"
              exact
              component={Appointments}
            />
            <Route path="/admin/specialities" exact component={Specialities} />
            <Route path="/admin/doctor-list" exact component={Doctors} />
            <Route path="/admin/patient-list" exact component={Patients} />
            <Route path="/admin/reviews" exact component={Reviews} />
            <Route
              path="/admin/transactions-list"
              exact
              component={Transaction}
            />
            <Route
              path="/admin/doctor-register"
              exact
              component={DoctorRegister}
            />
            <Route
              path="/admin/registerstepone"
              exact
              component={Registerstepone}
            />
            <Route
              path="/admin/register-step-2"
              exact
              component={Registersteptwo}
            />
            <Route
              path="/admin/register-step- 3"
              exact
              component={Registerstepthree}
            />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/invoicerepot" exact component={InvoiceReport} />
            <Route path="/admin/invoice" exact component={InvoiceReportList} />
            <Route path="/admin/blog" exact component={Blog} />
            <Route path="/admin/blog-details" exact component={BlogDetails} />
            <Route path="/admin/add-blog" exact component={AddBlog} />
            <Route path="/admin/edit-blog" exact component={EditBlog} />
            <Route path="/admin/pending-blog" exact component={PendingBlog} />
            <Route path="/admin/profile" exact component={Profile} />
            <Route path="/admin/product-list" exact component={ProductList} />
            <Route path="/admin/pharmacy-list" exact component={PharmacyList} />
            <Route path="/admin/pharmacy-category" exact component={Categories} />
            {/* <Route path="/admin/invoice" exact component={Invoice} /> */}

            <Route path="/admin/404" exact component={Error} />
            <Route path="/admin/500" exact component={ErrorPage} />
            <Route path="/admin/blank-page" exact component={BlankPage} />
            <Route path="/admin/components" exact component={Components} />
            <Route path="/admin/basic-input" exact component={BasicInput} />
            <Route path="/admin/form-input-group" exact component={FormInput} />
            <Route
              path="/admin/form-horizontal"
              exact
              component={FormHorizontal}
            />
            <Route path="/admin/form-vertical" exact component={FormVertical} />
            <Route path="/admin/form-mask" exact component={FormMask} />
            <Route
              path="/admin/form-validation"
              exact
              component={FormValidation}
            />
            <Route path="/admin/tables-basic" exact component={BasicTables} />
            <Route path="/admin/data-tables" exact component={DataTables} />
            <Route
              path="/admin/product-category"
              exact
              component={ProductCategories}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppUniversal;
