import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ApiController } from "../../constants/API/ApiController";
import { useContext } from "react";
// import ProductContext from "./ProductContext";
import { ProductContext } from "./ProductContext";
import "./ProductTable.css";
import AddProductDashboard from "./AddProductDashboard";

const ProductsTable = ({ categoryId, categoryName }) => {
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

  const [allProducts, setAllProducts] = useState([]);
  //  ===========================================================================================================
  const {
    selectProduct,
    closeAddProduct,
    isAddProductVisible,
    // // ------------------
    // loadAllProductsFromDatabase,
    // allProducts,
    // errorMsgOnLoadAllProductsFromDataBase,
    // successMsgOnLoadAllProductsFromDataBase,
  } = useContext(ProductContext);
  //  ===========================================================================================================

  const Navigate = useNavigate();

  //---------------------   load on   ----------------------------------------
  useEffect(() => {
    (async () => await loadAllProductsFromDatabase(categoryId))();
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

  // --------------------------------   to load all data from backend  ---------------------------------
  async function loadAllProductsFromDatabase(categoryId) {
    try {
      // ------------------------------------------ get all products -----------------------------------
      const productResult = await axios.get(
        // `${ApiController.products.getAllProductsByCategoryNameAPI}/${categoryName}`,
        `${ApiController.products.getAllProductsByCategoryIdAPI}/${categoryId}`,
        { withCredentials: true } // this line important
      );
      setAllProducts(productResult.data);
      console.log("All Products:", productResult.data);

      console.log(categoryId);
      setSuccessMsg("all products is loaded succesfully");
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
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await axios.delete(`https://localhost:7005/api/Products/${id}`, {
        withCredentials: true,
      });
      setSuccessMsg("Product deleted successfully");
      setTimeout(() => {
        setSuccessMsg("");
      }, 2000);
      await loadAllProductsFromDatabase(categoryId);
    } catch (error) {
      // console.log(error);
      // setErrorMsg("Failed to delete the Product. Please try again.");
      // setTimeout(() => {
      //   setErrorMsg("");
      // }, 2000);
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
      await loadAllProductsFromDatabase(categoryName);
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

      await loadAllProductsFromDatabase(categoryName);
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
                      <input
                        type="text"
                        name="quantity"
                        className="quantity form-control input-number"
                      />

                      {product.quantity}
                    </div>
                  </td>
                  <td>
                    <button
                      className="custom__button"
                      onClick={() => selectProduct(product)}
                    >
                      edit
                    </button>

                    <button
                      className="custom__button"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default ProductsTable;

// <div>
//   <button onClick={() => selectProduct(product)}>edit</button>
//   <div
//     className="Product_container "
//     id={`${product.categoryName}_product_${product.id}`}
//   >
//     <span
//       className="tag"
//       onClick={() => {
//         const containerEl = document.getElementById(
//           `${product.categoryName}_product_${product.id}`
//         );
//         containerEl.classList.toggle("flipped");
//       }}
//     >
//       <p>Ingredients</p>
//     </span>
//     <div className="front">
//       <div
//         className="product_img-container"
//         onClick={() => {
//           const containerEl = document.getElementById(
//             `${product.categoryName}_product_${product.id}`
//           );
//           containerEl.classList.toggle("flipped");
//         }}
//       >
//         {/* <img src={productImage} alt="product-img" /> */}
//         <img
//           src={`data:image/jpeg;base64,${product.imageFile}`}
//           alt="product-img"
//         />
//       </div>
//       <div
//         className="product_details"
//         onClick={() => {
//           const containerEl = document.getElementById(
//             `${product.categoryName}_product_${product.id}`
//           );
//           containerEl.classList.toggle("flipped");
//         }}
//       >
//         <p className="product_Title">
//           <span>Name: </span>
//           {product.name}
//         </p>
//         <p className="product_Description">
//           Description: {product.description}
//         </p>
//         <p className="categoryName">
//           category Name: {product.categoryName}
//         </p>
//         <div>Quantity: {product.quantity}</div>
//         <div>created at : {product.created_at}</div>
//         <p className="product_Price">
//           {product.priceDescription} : EGP
//           <span>{product.price.toFixed(2)}</span>
//         </p>
//       </div>
//       <div className="product_buttons_handler">
//         {product.quantity <= 0 ? (
//           <div className="product_countHandler">
//             <span
//               className="custom__button"
//               onClick={() => decreaseProductQuantity(product.id)}
//             >
//               -
//             </span>
//             {/* <input
//                           // value={cartItems[ProductID]}
//                           onChange={(e) =>
//                             updateCartItemCount(
//                               Number(e.target.value),
//                               id
//                             )
//                           }
//                         /> */}
//             <span
//               className="custom__button"
//               onClick={() => increaseProductQuantity(product.id)}
//             >
//               +
//             </span>
//           </div>
//         ) : (
//           <span
//             className="custom__button"
//             onClick={() => increaseProductQuantity(product.id)}
//           >
//             Add To Cart
//           </span>
//         )}
//         <span
//           className="custom__button"
//           onClick={() => deleteProduct(product.id)}
//         >
//           Delete
//         </span>
//         <span
//           className="custom__button"
//           // onClick={() => editeProduct(product)}
//           onClick={() => selectProduct(product)}
//         >
//           Edit
//         </span>
//       </div>
//       {product.quantity <= 0 ? (
//         <span
//           className="custom__button"
//           onClick={() => increaseProductQuantity(product.id)}
//         >
//           Add
//         </span>
//       ) : (
//         <>
//           <span
//             className="custom__button"
//             onClick={() => increaseProductQuantity(product.id)}
//           >
//             Increase
//           </span>
//           <span
//             className="custom__button"
//             onClick={() => decreaseProductQuantity(product.id)}
//           >
//             Decrease
//           </span>
//         </>
//       )}
//     </div>
//     <div
//       className="back"
//       onClick={() => {
//         const containerEl = document.getElementById(
//           `${product.categoryName}_product_${product.id}`
//         );
//         containerEl.classList.toggle("flipped");
//       }}
//     >
//       <h2>Ingredients: </h2>
//       <p>{product.ingredients}</p>
//     </div>
//   </div>
// </div>
