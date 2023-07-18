// import { createContext } from "react";

// const ProductContext = createContext();

// export default ProductContext;
import React, { createContext, useState } from "react";
import axios from "axios";
import { ApiController } from "../../constants/API/ApiController";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const openSideBarToggle = () => {
    setIsSideBarOpen(!isSideBarOpen); // Toggle the state of isSideBarOpen
  };
  // ====================================================================

  const [allProducts, setAllProducts] = useState([]);
  const [
    errorMsgOnLoadAllProductsFromDataBase,
    setErrorMsgOnLoadAllProductsFromDataBase,
  ] = useState([]);
  const [
    successMsgOnLoadAllProductsFromDataBase,
    setSuccessMsgOnLoadAllProductsFromDataBase,
  ] = useState([]);
  // ====================================================================
  const [allCategories, setAllCategories] = useState([]);
  const [
    errorMsgOnLoadAllCategoriesFromDataBase,
    setErrorMsgOnLoadAllCategoriesFromDataBase,
  ] = useState([]);
  const [
    successMsgOnLoadAllCategoriesFromDataBase,
    setSuccessMsgOnLoadAllCategoriesFromDataBase,
  ] = useState([]);

  //----------- product  ----------------

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditProductVisible, setIsEditProductVisible] = useState(false);
  const [isAddProductVisible, setIsAddProductVisible] = useState(false);

  //----------- category  ----------------
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditCategoryVisible, setIsEditCategoryVisible] = useState(false);
  const [isAddCategoryVisible, setIsAddCategoryVisible] = useState(false);

  //----------- product  ----------------
  const selectProduct = (product) => {
    setSelectedProduct(product);
    setIsEditProductVisible(true);
  };
  const closeEditProduct = () => {
    setIsEditProductVisible(false);
  };
  const closeAddProduct = () => {
    setIsAddProductVisible(false);
  };
  const openAddProductWindow = () => {
    setIsAddProductVisible(true);
  };

  //----------- category  ----------------
  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsEditCategoryVisible(true);
  };
  const closeEditCategory = () => {
    setIsEditCategoryVisible(false);
  };
  const closeAddCategory = () => {
    setIsAddCategoryVisible(false);
  };
  const openAddCategoryWindow = () => {
    setIsAddCategoryVisible(true);
  };

  // --------------------------------   to load all data from backend  ---------------------------------
  async function loadAllCategoriesFromDataBase() {
    try {
      // ------------------------------------------ get all categoryies -----------------------------------
      const categoryResult = await axios.get(
        ApiController.categories.getAllCategoriesAPI,
        { withCredentials: true } // this line important
      );
      setAllCategories(categoryResult.data);
      // console.log(categoryResult.data);
      setSuccessMsgOnLoadAllCategoriesFromDataBase(
        "all categories is loaded succesfully"
      );
      // --------------------------  Handel error messages  --------------
    } catch (error) {
      if (error.response) {
        setErrorMsgOnLoadAllCategoriesFromDataBase(error.response.data);
        setTimeout(() => {
          setErrorMsgOnLoadAllCategoriesFromDataBase("");
        }, 2000);
      } else if (error.request) {
        // the request was made but no response was received
        setErrorMsgOnLoadAllCategoriesFromDataBase(
          "no response received from server."
        );
        setTimeout(() => {
          setErrorMsgOnLoadAllCategoriesFromDataBase("");
        }, 2000);
      } else {
        //something happend insetting up the request
        setErrorMsgOnLoadAllCategoriesFromDataBase(
          "error in setting up the request."
        );
        setTimeout(() => {
          setErrorMsgOnLoadAllCategoriesFromDataBase("");
        }, 2000);
      }
    }
  }
  // --------------------------------   to load all data from backend  ---------------------------------
  async function loadAllProductsFromDatabase() {
    try {
      // ------------------------------------------ get all products -----------------------------------
      const productResult = await axios.get(
        "https://localhost:7005/api/Products",
        { withCredentials: true } // this line important
      );
      setAllProducts(productResult.data);
      console.log("All Products ????:", productResult.data);

      setSuccessMsgOnLoadAllProductsFromDataBase(
        "all products is loaded succesfully"
      );
      // --------------------------  Handel error messages  --------------
    } catch (error) {
      if (error.response) {
        setErrorMsgOnLoadAllProductsFromDataBase(error.response.data);
        setTimeout(() => {
          setErrorMsgOnLoadAllProductsFromDataBase("");
        }, 2000);
      } else if (error.request) {
        // the request was made but no response was received
        setErrorMsgOnLoadAllProductsFromDataBase(
          "no response received from server."
        );
        setTimeout(() => {
          setErrorMsgOnLoadAllProductsFromDataBase("");
        }, 2000);
      } else {
        //something happend insetting up the request
        setErrorMsgOnLoadAllProductsFromDataBase(
          "error in setting up the request."
        );
        setTimeout(() => {
          setErrorMsgOnLoadAllProductsFromDataBase("");
        }, 2000);
      }
    }
  }
  // Function to show toast notification
  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else if (type === "warning") {
      toast.warning(message);
    } else {
      toast.info(message);
    }
  };
  const contextValue = {
    openSideBarToggle,
    isSideBarOpen,
    // ------------------
    showToast,
    // ------------------
    loadAllProductsFromDatabase,
    allProducts,
    errorMsgOnLoadAllProductsFromDataBase,
    successMsgOnLoadAllProductsFromDataBase,
    // ------------------
    loadAllCategoriesFromDataBase,
    allCategories,
    errorMsgOnLoadAllCategoriesFromDataBase,
    successMsgOnLoadAllCategoriesFromDataBase,
    //----------- product  ----------------
    selectProduct,
    selectedProduct,

    isEditProductVisible,
    isAddProductVisible,

    closeEditProduct,
    closeAddProduct,

    openAddProductWindow,

    //----------- category  ----------------
    selectCategory,
    selectedCategory,

    isEditCategoryVisible,
    isAddCategoryVisible,

    closeEditCategory,
    closeAddCategory,

    openAddCategoryWindow,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </ProductContext.Provider>
  );
};
