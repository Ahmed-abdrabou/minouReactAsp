import React from "react";

import { ProductsItems_cupcakes } from "../../constants/ProductsItems_cupcakes";
import { Product } from "../../container/product/Product";

import "./Cupcakes.css";

const Cupcakes = () => (
  <div className="app__content section__padding Cookies">
    <div className="section_header">
      <h1>Cupcakes</h1>
    </div>

    <div className="ProductsItems_container">
      {ProductsItems_cupcakes.map((product, index) => (
        <Product key={index} data={product} />
      ))}
    </div>
  </div>
);

export default Cupcakes;
