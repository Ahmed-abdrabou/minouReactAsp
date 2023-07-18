import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Footer, BackGroundAnimations } from "./components";

import MainPage from "./pages/MainPage/MainPage";
import { CartContainer } from "./pages/Cart/CartContainer";
import { ShopContextProvider } from "./container/context/shop-context";
import { CheckOutByEmail } from "./pages/CheckOutByEmail/CheckOutByEmail";
import GiftBoxAnimation from "./pages/GiftBoxAnimation/GiftBoxAnimation";

import OrderNow from "./pages/OrderNow/OrderNow";

import MinouBox from "./pages/MinouBox/MinouBox";
import Cookies from "./pages/Cookies/Cookies";
import Brownies from "./pages/Brownies/Brownies";
import Cupcakes from "./pages/Cupcakes/Cupcakes";
import Eclairs from "./pages/Eclairs/Eclairs";
import LogInSignUP from "./pages/LogInSignUP/LogInSignUP";
import NotFound404 from "./pages/NotFound404/NotFound404";
import MinouBoxASP from "./container/MinouBoxASP/MinouBoxASP";

import Dashboard from "./pages/Dashboard/Dashboard";

import "./App.css";

const AppRoutes = () => {
  console.log("user");

  return (
    <ShopContextProvider>
      {/* <GiftBoxAnimation /> */}
      <Navbar user={null} />
      <BackGroundAnimations />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/minouReactAsp" element={<MainPage />} />
        <Route path="MinouBox/*" element={<MinouBox />} />
        <Route path="/Cart" element={<CartContainer />} />
        <Route path="/CheckOutByEmail" element={<CheckOutByEmail />} />
        <Route path="/OrderNow" element={<OrderNow />} />
        <Route path="/MinouBox" element={<MinouBox />} />
        <Route path="/Cookies" element={<Cookies />} />
        <Route path="/Brownies" element={<Brownies />} />
        <Route path="/Cupcakes" element={<Cupcakes />} />
        <Route path="/Eclairs" element={<Eclairs />} />
        <Route path="/LogInSignUP" element={<LogInSignUP />} />
        <Route path="/NotFound404" element={<NotFound404 />} />
        <Route path="/MinouBoxASP" element={<MinouBoxASP />} />

        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </ShopContextProvider>
    // <>app</>
  );
};

export default AppRoutes;
