import React from "react";

import { ProductsItems_eclairs } from "../../constants/ProductsItems_eclairs";
import { Product } from "../../container/product/Product";

import "./Eclairs.css";

const Eclairs = () => (
  <div className="app__content section__padding Cookies">
    <div className="section_header">
      <h1>Eclairs</h1>
    </div>

    <div className="ProductsItems_container">
      {ProductsItems_eclairs.map((product, index) => (
        <Product key={index} data={product} />
      ))}
    </div>
  </div>
);

export default Eclairs;
