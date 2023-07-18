import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";

import { Link } from "react-router-dom";
import "./DashboardSidBar.css";
const DashboardSidBar = () => {
  const { openSideBarToggle, isSideBarOpen } = useContext(ProductContext);

  return (
    <div
      className={`DashboardSidBar_container ${isSideBarOpen ? "open" : ""}`}
      onClick={openSideBarToggle}
    >
      <div className="DashboardSidBar">
        <div className="DashboardSidBar_closeButton">
          <button onClick={openSideBarToggle}>
            <span className="material-icons " aria-hidden="true">
              close
            </span>
          </button>
        </div>
        <Link to="/Dashboard">
          <div className="DashboardSidBar_title">
            <span className="material-icons">dashboard</span>
            <div>Dashboard</div>
          </div>
        </Link>
        {/*  */}
        <hr className="DashboardSidBar_hr"></hr>
        {/*  */}
        <Link to="Categories">
          <nav className="Dashboard__button">
            <span className="material-icons">category</span>
            <div>Categories</div>
          </nav>
        </Link>

        <Link to="Prouducts">
          <nav className="Dashboard__button">
            <span className="material-icons">toc</span>
            <div>Prouducts</div>
          </nav>
        </Link>
        <Link to="Users">
          <nav className="Dashboard__button">
            <span className="material-icons">supervised_user_circle</span>
            <div>Users</div>
          </nav>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidBar;
