import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Product } from "./Product";

const Products = (props) => {
  const [allCategories, setAllCategories] = useState([]);
  const [category, setcategory] = useState("");

  const [allProducts, setAllProducts] = useState([]);
  const [user, setUser] = useState("");

  // const [categoryName, setCategoryName] = useState("");

  const [errorMsg, setErrorMsg] = useState([]);
  const [successMsg, setSuccessMsg] = useState([]);

  const categoryName = props.categoryName;

  const Navigate = useNavigate();
  //---------------------   load on   ----------------------------------------

  useEffect(() => {
    (async () => await Load())();
  }, []);
  // --------------------------------   to load all data from backend  ---------------------------------
  async function Load() {
    try {
      const productResult = await axios.get(
        `https://localhost:7005/api/Products/ByCategory/${categoryName}`,
        { withCredentials: true } // this line important
      );
      setAllProducts(productResult.data);
      // --------------------------  Handel error messages  --------------
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data);
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      } else if (error.request) {
        // the request was made but no response was received
        setErrorMsg("no response received from server.");
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      } else {
        //something happend insetting up the request
        setErrorMsg("error in setting up the request.");
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      }
    }
  }

  return (
    <div className="ProductsItems_container">
      {allProducts &&
        allProducts.map((product, index) => (
          <Product key={index} data={product} categoryName={categoryName} />
        ))}
    </div>
  );
};

export default Products;
