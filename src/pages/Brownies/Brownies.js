import React from "react";

import { ProductsItems_brownies } from "../../constants/ProductsItems_brownies";
import { Product } from "../../container/product/Product";

import "./Brownies.css";

const Brownies = () => (
  <div className="app__content section__padding Cookies">
    <div className="section_header">
      <h1>Brownies</h1>
    </div>

    <div className="ProductsItems_container">
      {ProductsItems_brownies.map((product, index) => (
        <Product key={index} data={product} />
      ))}
    </div>
  </div>
);

export default Brownies;
