import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ProductContext } from "./ProductContext";

const AddProductDashboard = ({ closeAddProduct }) => {
  const [ProductID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [selectedcategoryName, setSelectedCategoryName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productIngredients, setproductIngredients] = useState("");
  const [productPriceDescription, setproductPriceDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  //  ===========================================================================================================
  const {
    showToast,
    //--------------------------------
    loadAllCategoriesFromDataBase,
    allCategories,
    errorMsgOnLoadAllCategoriesFromDataBase,
    successMsgOnLoadAllCategoriesFromDataBase,
    // ------------------
    loadAllProductsFromDatabase,
    allProducts,
    errorMsgOnLoadAllProductsFromDataBase,
    successMsgOnLoadAllProductsFromDataBase,
  } = useContext(ProductContext);
  //  ===========================================================================================================

  const validateInputs = () => {
    if (!productName) {
      return "Please enter a product name";
    }

    if (!productDescription) {
      return "Please enter a product description";
    }

    if (!productIngredients) {
      return "Please enter product ingredients";
    }

    if (!productPriceDescription) {
      return "Please enter a price description";
    }

    if (!productPrice) {
      return "Please enter a product price";
    }

    if (!productQuantity) {
      return "Please enter a product quantity";
    }

    if (!selectedImage) {
      return "Please select a product image";
    }

    return null;
  };

  //  ===========================================================================================================
  const Navigate = useNavigate();
  //  ===========================================================================================================

  // -----------------------------    add product modal open and closed functions --------------------
  const handleOutsideClick = (event) => {
    if (event.target.className === "modal") {
      closeAddProduct();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // --------------------------------   handle Image Change  ---------------------------------
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  //------------------------------------ addNewProduct -------------------------------------

  // async function addNewProduct(event) {
  //   event.preventDefault();

  //   if (!productName || !productPrice || !productQuantity) {
  //     setErrorMsg("Please enter a name price , quantity for the product");
  //     return;
  //   }

  //   try {
  //     await axios.post("https://localhost:7005/api/Products", {
  //       name: productName,
  //       Price: productPrice,
  //       quantity: productQuantity,
  //       imageFile: selectedImage,
  //     });
  //     setSuccessMsg("product registered succesfully");

  //     setProductID("");
  //     setProductName("");
  //     setProductPrice("");
  //     setProductQuantity("");
  //     setSelectedImage("");

  //     await loadAllCategoriesFromDataBase();//await loadAllProductsFromDatabase();
  //   } catch (err) {
  //     console.log(err);
  //     console.error(err.response.data);
  //     setErrorMsg("Failed to save the product. Please try again.");
  //   }
  // }

  //------------------------------------ addNewProduct -------------------------------------
  async function addNewProduct(event) {
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

    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("ingredients", productIngredients);
    formData.append("priceDescription", productPriceDescription);
    formData.append("Price", productPrice);
    formData.append("quantity", productQuantity);
    formData.append("imageFile", selectedImage); // Now this should work

    try {
      // Send the POST request, and set the 'Content-Type' header to 'multipart/form-data'.
      // When sending a FormData object with Axios, it will automatically set the 'Content-Type' for you.
      await axios.post("https://localhost:7005/api/Products", formData, {
        withCredentials: true,
      });
      // Show success toast
      showToast("product registered succesfully", "success");

      setProductID("");
      setSelectedCategoryName("");
      setProductName("");
      setProductDescription("");
      setproductIngredients("");
      setproductPriceDescription("");
      setProductPrice("");
      setProductQuantity("");
      setSelectedImage(null); // Use null for initial file state, not an empty string

      await loadAllCategoriesFromDataBase();
      await loadAllProductsFromDatabase();

      closeAddProduct();
    } catch (error) {
      // console.log(error);
      // console.error(error.response.data);
      // setErrorMsg("Failed to save the product. Please try again.");
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

    setProductID("");
    setSelectedCategoryName("");
    setProductName("");
    setProductDescription("");
    setproductIngredients("");

    setproductPriceDescription("");
    setProductPrice("");
    setProductQuantity("");
    setSelectedImage(null);
  }

  // -----------------------------------   to refresh data from database ------------------------------
  async function refresh(e) {
    e.preventDefault();

    setProductID("");
    setSelectedCategoryName("");
    setProductName("");
    setProductDescription("");
    setproductIngredients("");

    setproductPriceDescription("");
    setProductPrice("");
    setProductQuantity("");
    setSelectedImage(null);

    await loadAllCategoriesFromDataBase();
    //await loadAllProductsFromDatabase();
  }
  //--------------------------------- increase product quantity ------------------------------

  // Function to increase quantity for a specific Product
  const increaseProductQuantity = async (productId) => {
    try {
      // const productToUpdate = allProducts.find(
      //   (product) => product.id === productId
      // );
      // const updatedQuantity = productToUpdate.quantity + 1;

      // await axios.patch(`https://localhost:7005/api/Products/${productId}`, {
      //   ...productToUpdate,
      //   quantity: updatedQuantity,
      // });

      // to refresh the data from back end
      await loadAllCategoriesFromDataBase();
      //await loadAllProductsFromDatabase();
    } catch (err) {
      console.log(err);
      setErrorMsg("Failed to update the product quantity. Please try again.");
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
    }
  };

  //--------------------------------- decreass product quantity ------------------------------

  // Function to decrease quantity for a specific product
  const decreaseProductQuantity = async (productId) => {
    try {
      // const productToUpdate = allProducts.find(
      //   (product) => product.id === productId
      // );
      // const updatedQuantity = productToUpdate.quantity - 1;

      // await axios.patch(`https://localhost:7005/api/Products/${productId}`, {
      //   ...productToUpdate,
      //   quantity: updatedQuantity,
      // });

      await loadAllCategoriesFromDataBase();
      //await loadAllProductsFromDatabase();
    } catch (err) {
      console.log(err);
      setErrorMsg("Failed to update the product quantity. Please try again.");
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
    }
  };

  return (
    <form className="modal-content">
      <div className="form_header">
        <h2>Add Product</h2>
        <button onClick={closeAddProduct}>close</button>
      </div>

      <div className="form_content">
        {/* <h2>{(errorMsg = !String && JSON.stringify(errorMsg))}</h2> */}
        {/* <h2>{JSON.stringify(errorMsg)}</h2> */}
        {/* <div>
        <label htmlFor="ProductID">Product ID:</label>

        <input
          // type="hidden"
          id="ProductID"
          value={ProductID}
          onChange={(e) => {
            // setId(e.target.value);
          }}
        />
      </div> */}
        <div className="form_element">
          <label htmlFor="categoryName">category Name :</label>

          <select
            required
            name="categoryName"
            value={selectedcategoryName}
            placeholder="choose category"
            onChange={(e) => {
              setSelectedCategoryName(e.target.value);
            }}
          >
            <option value="">Choose category:</option>
            {allCategories &&
              allCategories.map((category) => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form_element">
          <label htmlFor="name">Product Name: </label>
          <input
            type="text"
            id="name"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
        </div>
        <div className="form_element">
          <label htmlFor="productDescription">Product Description: </label>
          <input
            type="text"
            id="productDescription"
            value={productDescription}
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
          />
        </div>
        <div className="form_element">
          <label htmlFor="ingredients">Product productIngredients: </label>
          <input
            type="text"
            id="ingredients"
            value={productIngredients}
            onChange={(e) => {
              setproductIngredients(e.target.value);
            }}
          />
        </div>
        <div className="form_element">
          <label htmlFor="priceDescription">Price Description: </label>
          <input
            type="text"
            id="priceDescription"
            value={productPriceDescription}
            onChange={(e) => {
              setproductPriceDescription(e.target.value);
            }}
          />
        </div>
        <div className="form_element">
          <label htmlFor="quantity">Product quantity: </label>
          <input
            type="number"
            id="quantity"
            value={productQuantity}
            onChange={(e) => {
              setProductQuantity(e.target.value);
            }}
          />
        </div>
        <div className="form_element">
          <label htmlFor="price">Product price: </label>
          <input
            type="text"
            id="price"
            value={productPrice}
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
          />
        </div>
        <div className="form_element">
          <label htmlFor="image">Product image: </label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
      </div>
      <div className="modal_controller">
        {/* <button
          type="submit"
          // onClick={save(brand)}
        ></button> */}
        <button onClick={addNewProduct}>add New Product</button>
        <button onClick={clear}>clear</button>
        <button onClick={refresh}>refresh</button>
      </div>
    </form>
  );
};
export default AddProductDashboard;
