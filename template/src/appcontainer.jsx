/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import config from "config";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import AppUniversal from "./admin/app-universal";

const AppContainer = function (props) {

  if (props) {

    useEffect(() => {
      const handleMouseMove = (event) => {
        const cursorInner = document.querySelector(".cursor-inner");
        const cursorOuter = document.querySelector(".cursor-outer");

        if (cursorOuter) {
          cursorOuter.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        }

        if (cursorInner) {
          cursorInner.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        }
      };

      const handleMouseEnter = () => {
        const cursorInner = document.querySelector(".cursor-inner");
        const cursorOuter = document.querySelector(".cursor-outer");

        if (cursorInner) {
          cursorInner.classList.add("s");
        }

        if (cursorOuter) {
          cursorOuter.classList.add("s");
        }
      };

      const handleMouseLeave = (event) => {
        const cursorInner = document.querySelector(".cursor-inner");
        const cursorOuter = document.querySelector(".cursor-outer");

        if (
          event.target.tagName !== "A" ||
          !event.target.closest(".cursor-pointer")
        ) {
          if (cursorInner) {
            cursorInner.classList.remove("cursor-hover");
          }

          if (cursorOuter) {
            cursorOuter.classList.remove("cursor-hover");
          }
        }
      };

      document.body.addEventListener("mousemove", handleMouseMove);
      document.body.addEventListener("mouseenter", handleMouseEnter);
      document.body.addEventListener("mouseleave", handleMouseLeave);

      const cursorInner = document.querySelector(".cursor-inner");
      const cursorOuter = document.querySelector(".cursor-outer");

      if (cursorInner) {
        cursorInner.style.visibility = "visible";
      }

      if (cursorOuter) {
        cursorOuter.style.visibility = "visible";
      }

      return () => {
        document.body.removeEventListener("mousemove", handleMouseMove);
        document.body.removeEventListener("mouseenter", handleMouseEnter);
        document.body.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);

    return (
      <Router basename={`${config.publicPath}`}>
        {" "}
        
          <div>
            <Switch>
              <Route path="/admin" component={AppUniversal} />
            </Switch>
          </div>
        
      </Router>
    );
  }
  return null;
};

export default AppContainer;
