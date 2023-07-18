import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ApiController } from "../../constants/API/ApiController";
import { useContext } from "react";
// import ProductContext from "./ProductContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { ProductContext } from "./ProductContext";
import "./ProductTable.css";

const AllProductsTable = () => {
  const [ProductID, setProductID] = useState(0);
  const [selectedcategoryName, setSelectedCategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productIngredients, setproductIngredients] = useState("");

  const [productPriceDescription, setproductPriceDescription] = useState("");

  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [errorMsg, setErrorMsg] = useState([]);
  const [successMsg, setSuccessMsg] = useState([]);
  //========================================================================
  // ====================================================================

  //  ===========================================================================================================
  const {
    showToast,
    selectProduct,
    closeAddProduct,
    isAddProductVisible,
    // ------------------
    loadAllProductsFromDatabase,
    allProducts,
    errorMsgOnLoadAllProductsFromDataBase,
    successMsgOnLoadAllProductsFromDataBase,
  } = useContext(ProductContext);
  //  ===========================================================================================================

  const Navigate = useNavigate();

  //---------------------   load on   ----------------------------------------
  useEffect(() => {
    (async () => await loadAllProductsFromDatabase())();
  }, []);
  // useEffect(() => {
  //   (async () => await loadAllProductsFromDatabase(categoryId))();
  // }, [categoryId]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await loadAllProductsFromDatabase(categoryId);
  //   };

  //   fetchData();
  // }, [categoryId]);

  // -----------------------------  edit data in frontend before use another function (put or patch) to send the edite to backend----------------------------------

  async function editeProduct(product) {
    setProductID(product.id);
    setSelectedCategoryName(product.categoryName);
    setProductName(product.name);
    setProductDescription(product.description);
    setproductIngredients(product.ingredients);

    setproductPriceDescription(product.priceDescription);
    setProductPrice(product.price);
    setProductQuantity(product.quantity);
  }

  //--------------------------------- to delete product from database ------------------------------
  async function deleteProduct(id) {
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
          await axios.delete(`https://localhost:7005/api/Products/${id}`, {
            withCredentials: true,
          });
          showToast("Product deleted successfully", "success");

          await loadAllProductsFromDatabase();
        } catch (error) {
          if (error.response) {
            showToast(error.response.data, "error");
          } else if (error.request) {
            showToast("no response received from server.", "error");
          } else {
            showToast("error in setting up the request.", "error");
          }
        }
      }
    });
  }

  //--------------------------------- increase product quantity ------------------------------

  // Function to increase quantity for a specific Product
  const increaseProductQuantity = async (productId) => {
    try {
      const productToUpdate = allProducts.find(
        (product) => product.id === productId
      );
      const updatedQuantity = productToUpdate.quantity + 1;

      await axios.patch(`https://localhost:7005/api/Products/${productId}`, {
        ...productToUpdate,
        quantity: updatedQuantity,
      });

      // to refresh the data from back end
      await loadAllProductsFromDatabase();
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
      const productToUpdate = allProducts.find(
        (product) => product.id === productId
      );
      const updatedQuantity = productToUpdate.quantity - 1;

      await axios.patch(`https://localhost:7005/api/Products/${productId}`, {
        ...productToUpdate,
        quantity: updatedQuantity,
      });

      await loadAllProductsFromDatabase();
    } catch (err) {
      console.log(err);
      setErrorMsg("Failed to update the product quantity. Please try again.");
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
    }
  };

  return (
    <>
      {/* <EditeProductDashboard
        categoryName={categoryName}
        productName={productName}
        productDescription={productDescription}
        productPriceDescription={productPriceDescription}
        productIngredients={productIngredients}
        productPrice={productPrice}
        productQuantity={productQuantity}
      /> */}

      <table className="table">
        <thead className="thead-primary">
          <tr>
            <th>Id:</th>
            <th>product img</th>
            <th>Product</th>
            <th>Description</th>

            <th>Ingredients</th>

            <th>category</th>
            <th>Price</th>
            <th>Quantity:</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {allProducts &&
            allProducts.map((product, index) => {
              return (
                <tr
                  className="alert"
                  id={`${product.categoryId}_product_${product.id}`}
                  key={`${product.categoryId}_product_${product.id}`}
                >
                  <td>
                    <div>{index + 1}</div>
                  </td>
                  {/* img */}
                  <td>
                    <div className="product_img">
                      <img
                        src={`data:image/jpeg;base64,${product.imageFile}`}
                        alt="product-img"
                      />
                    </div>
                  </td>
                  {/* product_Title */}
                  <td>
                    <div className="product_Title">{product.name}</div>
                  </td>
                  {/* product_Description */}
                  <td>
                    <div className="product_Description">
                      {product.description}
                    </div>
                  </td>
                  {/* product_Ingredients */}
                  <td>
                    <div className="product_Ingredients">
                      {product.ingredients}
                    </div>
                  </td>
                  {/* categoryName */}
                  <td>
                    <div className="categoryName">{product.categoryName}</div>
                  </td>
                  {/* product_Price */}
                  <td>
                    <div className="product_Price">
                      {product.priceDescription} : EGP
                      <span>{product.price.toFixed(2)}</span>
                    </div>
                  </td>
                  {/* product_Quantity */}
                  <td className="product_Quantity">
                    <div className="input-group">
                      {/* <input
                        type="text"
                        name="quantity"
                        className="quantity form-control input-number"
                      /> */}
                    </div>
                    {product.quantity}
                  </td>
                  <td>
                    <div className="tabel_controller">
                      <button onClick={() => selectProduct(product)}>
                        edit
                      </button>

                      <button onClick={() => deleteProduct(product.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default AllProductsTable;
