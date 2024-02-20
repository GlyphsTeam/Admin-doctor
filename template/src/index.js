import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
// import * as serviceWorker from './client/serviceWorker';
import { Provider } from 'react-redux';

import store from './store/index';

// boostrap
import "bootstrap/dist/css/bootstrap.min.css";
//fontawesome

import "react-image-lightbox/style.css";
import "react-datepicker/dist/react-datepicker.css";
//carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./client/assets/css/owl.carousel.min.css";

import "bootstrap/dist/css/bootstrap.min.css";

// import './client/assets/css/aos.css'

// if (
//   !window.location.pathname?.includes("admin") &&
//   !window.location.pathname.includes("pharmacyadmin")
// ) {
//   require("./client/assets/css/all.css");
//   require("./client/assets/css/all.min.css");
//   require("./client/assets/css/fontawesome.min.css");
//   require("./client/assets/css/custom.css");
// } 
// console.log('window.location.pathname :>> ', window.location.pathname);

require("./admin/assets/css/feathericon.min.css");
require("./admin/assets/js/feather.min.js");
// require("./admin/assets/plugins/fontawesome/css/fontawesome.min.css");
require("./admin/assets/plugins/fontawesome/css/all.min.css");
// require("./admin/assets/plugins/fontawesome/js/fontawesome.min.js");
require("./admin/assets/css/font-awesome.min.css");
require("./admin/assets/css/custom.css");
require("./client/assets/css/custom.css");
require("./App.css");
// ReactDOM.render(<AppRouter/>, document.getElementById('root'));

// if (module.hot) { // enables hot module replacement if plugin is installed
//  module.hot.accept();
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>

  </>
);
