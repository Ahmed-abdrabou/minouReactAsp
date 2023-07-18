import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";

import "./DashboardNavBar.css";
const DashboardNavBar = () => {
  const { openSideBarToggle, isSideBarOpen } = useContext(ProductContext);
  return (
    <div className="DashboardNavBar">
      <div className="left_Side"></div>
      <div className="Center">
        <div className="searchBox">
          <input type="text" id="searchBox" />
          <span>search here</span>
        </div>
      </div>

      <div className="right_Side">
        <div className="sideBar_control">
          {isSideBarOpen ? (
            <button onClick={openSideBarToggle}>
              <span className="material-symbols-outlined">menu</span>
            </button>
          ) : (
            <button onClick={openSideBarToggle}>
              <span className="material-symbols-outlined">menu_open</span>
            </button>
          )}
        </div>
        <div className="links">
          <div className="user_img">
            <img
              src="/minoupastryshop/static/media/logo2.c8afb0ffe1a2d2e5302f.png"
              alt=""
            />
          </div>
          <div className="user_Name">
            <span>ahmed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavBar;
