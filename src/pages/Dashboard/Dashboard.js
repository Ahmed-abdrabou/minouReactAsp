// App.js or wherever you're defining your main component structure
import { Routes, Route } from "react-router-dom";

import { ProductProvider } from "./ProductContext";
import ProuductsDashboard from "./ProuductsDashboard";
import CategoriesDashboard from "./CategoriesDashboard";
import UsersDashboard from "./UsersDashboard";

import DashboardNavBar from "./DashboardNavBar";
import DashboardSidBar from "./DashboardSidBar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="">
      <ProductProvider>
        <DashboardSidBar />

        <DashboardNavBar />

        <Routes>
          <Route path="/" element={<UsersDashboard />} />
          <Route path="/Categories" element={<CategoriesDashboard />} />
          <Route path="/Prouducts" element={<ProuductsDashboard />} />
          <Route path="/Users" element={<UsersDashboard />} />
        </Routes>
      </ProductProvider>
    </div>
  );
};

export default Dashboard;
