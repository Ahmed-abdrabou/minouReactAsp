import React from "react";

// import { FloatingWhatsApp } from "react-floating-whatsapp";

// import { MinouBox_img_Brownies } from "../../constants/MinouBox_img_Brownies";

// import { ProductBrounies } from "./ProductBrounies";
// import { ProductCookies } from "./ProductCookies";
// import { ProductCupcakes } from "./ProductCupcakes";

import { ProductsItems_brownies } from "../../constants/ProductsItems_brownies";
import { ProductsItems_cookies } from "../../constants/ProductsItems_cookies";
import { ProductsItems_cupcakes } from ".././../constants/ProductsItems_cupcakes";
import { ProductsItems_eclairs } from ".././../constants/ProductsItems_eclairs";
import { Product } from "../../container/product/Product";

import "./MinouBox.css";

const MinouBox = () => (
  <div className="app__content section__padding MinouBox">
    <div className="section_header">
      <h1>MinouBox</h1>
    </div>
    <div className="section_Text_container">
      <h2>Brownies</h2>
    </div>
    <div className="ProductsItems_container">
      {ProductsItems_brownies.map((product, index) => (
        <Product key={index} data={product} />
      ))}
    </div>
    <div className="section_Text_container">
      <h2>Cookies</h2>
    </div>
    <div className="ProductsItems_container">
      {ProductsItems_cookies.map((product, index) => (
        <Product key={index} data={product} />
      ))}
    </div>
    <div className="section_Text_container">
      <h2>Cupcakes</h2>
    </div>
    <div className="ProductsItems_container">
      {ProductsItems_cupcakes.map((product, index) => (
        <Product key={index} data={product} />
      ))}
    </div>
    <div className="section_Text_container">
      <h2>Eclairs</h2>
    </div>
    <div className="ProductsItems_container">
      {ProductsItems_eclairs.map((product, index) => (
        <Product key={index} data={product} />
      ))}
    </div>
  </div>
);

export default MinouBox;
