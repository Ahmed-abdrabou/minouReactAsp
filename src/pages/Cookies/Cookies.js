import React from "react";

import { ProductsItems_cookies } from "../../constants/ProductsItems_cookies";
import { Product } from "../../container/product/Product";

import "./Cookies.css";

const Cookies = () => (
  <div className="app__content section__padding Cookies">
    <div className="section_header">
      <h1>Cookies</h1>
    </div>

    <div className="ProductsItems_container">
      {ProductsItems_cookies.map((product, index) => (
        <Product key={index} data={product} />
      ))}
    </div>
  </div>
);

export default Cookies;
