import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ApiController } from "../../constants/API/ApiController";
import { ProductContext } from "./ProductContext";

const AddCategoryDashboard = ({ closeAddCategory }) => {
  const [CategoryID, setCategoryID] = useState("");

  const [categoryName, setCategoryName] = useState("");
  const [selectedcategoryName, setSelectedCategoryName] = useState("");

  const [errorMsg, setErrorMsg] = useState([]);
  const [successMsg, setSuccessMsg] = useState([]);

  const validateInputs = () => {
    if (!categoryName) {
      return "Please enter a category name";
    }
    return null;
  };

  const Navigate = useNavigate();
  //  ===========================================================================================================
  const {
    showToast,
    // ------------------
    loadAllCategoriesFromDataBase,
    allCategories,
  } = useContext(ProductContext);
  //--------------------------------   load on   ----------------------------------------

  // useEffect(() => {
  //   (async () => await loadAllCategoriesFromDataBase())();
  // }, []);

  // -----------------------------    add category modal open and closed functions --------------------
  const handleOutsideClick = (event) => {
    if (event.target.className === "modal") {
      closeAddCategory();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  //------------------------------------ addNewCategory -------------------------------------
  async function addNewCategory(event) {
    event.preventDefault();

    const errorMessage = validateInputs();

    if (errorMessage) {
      showToast(errorMessage, "error");
      return;
    }

    // Create a new FormData object
    const formData = new FormData();

    // Append each part of the data to the FormData object
    formData.append("id", 1);

    formData.append("categoryName", selectedcategoryName);

    formData.append("name", categoryName);

    try {
      // Send the POST request, and set the 'Content-Type' header to 'multipart/form-data'.
      // When sending a FormData object with Axios, it will automatically set the 'Content-Type' for you.
      await axios.post("https://localhost:7005/api/Categories", formData, {
        withCredentials: true,
      });
      // Show success toast
      showToast("category registered succesfully", "success");

      // // After successfully adding the category, fetch the updated list of categories
      // toast.success("category registered succesfully");

      setCategoryID("");
      setSelectedCategoryName("");
      setCategoryName("");
      await loadAllCategoriesFromDataBase();

      closeAddCategory();
    } catch (error) {
      // console.log(error);
      // console.error(error.response.data);
      // setErrorMsg("Failed to save the category. Please try again.");
      // setTimeout(() => {
      //   setErrorMsg("");
      // }, 2000);

      if (error.response) {
        showToast(error.response.data, "error");
      } else if (error.request) {
        showToast("no response received from server.", "error");
      } else {
        showToast("error in setting up the request.", "error");
      }
    }
  }

  //--------------------------------  to clear inputs -------------------------
  async function clear(e) {
    e.preventDefault();

    setCategoryID("");
    setSelectedCategoryName("");
    setCategoryName("");
  }

  // -----------------------------------   to refresh data from database ------------------------------
  async function refresh(e) {
    e.preventDefault();

    setCategoryID("");
    setSelectedCategoryName("");
    setCategoryName("");

    await loadAllCategoriesFromDataBase();
  }

  return (
    <form className="modal-content">
      <div className="form_header">
        <h2>Add Category</h2>
        <button onClick={closeAddCategory}>close</button>
      </div>
      <div className="form_content">
        {/* <div className="form_element">
          <label htmlFor="CategoryID">Category ID:</label>

          <input
            // type="hidden"
            id="CategoryID"
            value={CategoryID}
            onChange={(e) => {
              // setId(e.target.value);
            }}
          />
        </div> */}
        <div className="form_element">
          <label htmlFor="name">Category Name: </label>
          <input
            type="text"
            id="name"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="modal_controller">
        <button onClick={addNewCategory}>add New Category</button>
        <button onClick={clear}>clear</button>
        <button onClick={refresh}>refresh</button>
      </div>
    </form>
  );
};
export default AddCategoryDashboard;
