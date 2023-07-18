import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { ApiController } from "../../constants/API/ApiController";
import { ProductContext } from "./ProductContext";

const EditCategoryDashboard = ({ category }) => {
  // const [CategoryID, setCategoryID] = useState();
  const [CategoryID, setCategoryID] = useState(category.id);
  const [selectedcategoryName, setSelectedCategoryName] = useState(
    category.categoryName
  );
  const [categoryName, setCategoryName] = useState(category.name);

  const [errorMsg, setErrorMsg] = useState([]);
  const [successMsg, setSuccessMsg] = useState([]);

  //  ===========================================================================================================
  const {
    showToast,
    closeEditCategory,
    loadAllCategoriesFromDataBase,
    allCategories,
    errorMsgOnLoadAllCategoriesFromDataBase,
    successMsgOnLoadAllCategoriesFromDataBase,
  } = useContext(ProductContext);

  const validateInputs = () => {
    if (!categoryName) {
      return "Please enter a category name";
    }
    return null;
  };
  const Navigate = useNavigate();

  // useEffect(() => {
  //   (async () => await loadAllCategoriesFromDataBase())();
  // }, []);

  // -----------------------------    add category modal open and closed functions --------------------
  const handleOutsideClick = (event) => {
    if (event.target.className === "modal") {
      closeEditCategory();
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
      await axios.post("https://localhost:7005/api/Categorys", formData, {
        withCredentials: true,
      });
      // Show success toast
      showToast("category registered succesfully", "success");

      setCategoryID("");
      setSelectedCategoryName("");
      setCategoryName("");

      await loadAllCategoriesFromDataBase();

      closeEditCategory();
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

  // -----------------------------  edit data in frontend before use another function (put or patch) to send the edite to backend----------------------------------
  async function editeCategory(category) {
    setCategoryID(category.id);
    setSelectedCategoryName(category.categoryName);
    setCategoryName(category.name);
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

  //------------------------------------------------------------------------------ update category functions ---------------------------------------------------------------------------------

  //--------------------------------- put (update)------------------------------

  async function put(event) {
    event.preventDefault();

    const errorMessage = validateInputs();

    if (errorMessage) {
      showToast(errorMessage, "error");
      return;
    }

    try {
      // https://localhost:7005/api/Categories/?id=15
      // await axios.put(`https://localhost:7005/api/Categories/?id=${id}`, {
      await axios.put(
        `https://localhost:7005/api/Categories//${CategoryID}`,
        {
          id: CategoryID,
          categoryName: selectedcategoryName,
          name: categoryName,
        },
        {
          withCredentials: true,
        }
      );
      // Show success toast
      showToast("category updated succesfully", "success");

      setCategoryID("");
      setSelectedCategoryName("");
      setCategoryName("");

      await loadAllCategoriesFromDataBase();

      closeEditCategory();
    } catch (error) {
      // console.log(error);
      // setErrorMsg("Failed to update the Category. Please try again.");
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
  // --------------------------------- patch (update) ------------------------------

  async function patch(event) {
    event.preventDefault();

    const errorMessage = validateInputs();

    if (errorMessage) {
      showToast(errorMessage, "error");
      return;
    }

    try {
      await axios.patch(
        "https://localhost:7005/api/Categories/" + CategoryID,
        {
          // await axios.patch(`https://localhost:7005/api/Categorys/${id}`, {
          id: CategoryID,
          name: categoryName,
        },
        {
          withCredentials: true,
        }
      );
      // Show success toast
      showToast("category updated succesfully", "success");

      setCategoryID("");
      setSelectedCategoryName("");
      setCategoryName("");

      await loadAllCategoriesFromDataBase();

      closeEditCategory();
    } catch (error) {
      // console.log(error);
      // setErrorMsg("Failed to update the Category. Please try again.");
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

  //--------------------------------- to delete category from database ------------------------------
  async function deleteCategory(event) {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            "https://localhost:7005/api/Categories/" + CategoryID,
            {
              withCredentials: true,
            }
          );
          showToast("Category deleted successfully", "success");
          await loadAllCategoriesFromDataBase();

          closeEditCategory();
        } catch (error) {
          if (error.response) {
            setErrorMsg(error.response.data);
            setTimeout(() => {
              setErrorMsg("");
            }, 2000);
          } else if (error.request) {
            setErrorMsg("No response received from the server.");
            setTimeout(() => {
              setErrorMsg("");
            }, 2000);
          } else {
            setErrorMsg("Error in setting up the request.");
            setTimeout(() => {
              setErrorMsg("");
            }, 2000);
          }
        }
      }
    });
  }

  return (
    <form className="modal-content">
      <div className="form_header">
        <h2>edit Category details</h2>
        <button onClick={closeEditCategory}>close</button>
      </div>
      {/* <h2>{errorMsg=!String && JSON.stringify(errorMsg)}</h2> */}
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
      <div className="modal_controller">
        <button onClick={addNewCategory}>add New Category</button>
        <button onClick={patch}>patch</button>
        <button onClick={put}>put</button>
        <button onClick={clear}>clear</button>
        <button onClick={refresh}>refresh</button>
        <button onClick={deleteCategory}>delete</button>
      </div>
    </form>
  );
};
export default EditCategoryDashboard;
