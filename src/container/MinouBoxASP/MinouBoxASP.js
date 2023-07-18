import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Products from "./Products";

import "./MinouBox.css";
import { ApiController } from "../../constants/API/ApiController";

const MinouBoxASP = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [category, setcategory] = useState("");

  const [allProducts, setAllProducts] = useState([]);
  const [user, setUser] = useState("");

  const [categoryName, setCategoryName] = useState("");

  const [errorMsg, setErrorMsg] = useState([]);
  const [successMsg, setSuccessMsg] = useState([]);

  const Navigate = useNavigate();
  //---------------------   load on   ----------------------------------------

  useEffect(() => {
    (async () => await Load())();
  }, []);
  // --------------------------------   to load all data from backend  ---------------------------------
  async function Load() {
    try {
      // ------------------------------------------ get all categoryies -----------------------------------
      const categoryResult = await axios.get(
        // "https://localhost:7005/api/Categories",
        `${ApiController.categories.getAllCategoriesAPI}`,
        { withCredentials: true } // this line important
      );
      setAllCategories(categoryResult.data);
      console.log(ApiController.categories.getAllCategoriesAPI);
      setErrorMsg("");
      // --------------------------  Handel error messages  --------------
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data);
        setTimeout(() => {
          // setErrorMsg("");
        }, 2000);
      } else if (error.request) {
        // the request was made but no response was received
        setErrorMsg("no response received from server.");
        setTimeout(() => {
          // setErrorMsg("");
        }, 2000);
      } else {
        //something happend insetting up the request
        setErrorMsg("error in setting up the request.");
        setTimeout(() => {
          // setErrorMsg("");
        }, 2000);
      }
    }
  }

  return (
    <div className="app__content section__padding MinouBox">
      <div className="section_header">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <>{errorMsg}</>
        <h1>MinouBox</h1>
      </div>
      {allCategories &&
        allCategories.map((category) => {
          return (
            <>
              <div className="section_Text_container">
                <h2>{category.name}</h2>
              </div>
              <Products categoryName={category.name} />
            </>
          );
        })}
    </div>
  );
};

export default MinouBoxASP;
