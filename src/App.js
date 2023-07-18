import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppRoutes from "./AppRoutes";

import LogInSignUP from "./pages/LogInSignUP/LogInSignUP";
import NotFound404 from "./pages/NotFound404/NotFound404";

import Dashboard from "./pages/Dashboard/Dashboard";

import "./App.css";

const App = () => {
  console.log("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppRoutes />} />

        <Route path="/LogInSignUP" element={<LogInSignUP />} />

        <Route path="/NotFound404" element={<NotFound404 />} />

        <Route path="/Dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    // <>app</>
  );
};

export default App;
