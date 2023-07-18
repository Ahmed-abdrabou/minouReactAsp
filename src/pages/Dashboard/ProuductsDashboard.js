import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ApiController } from "../../constants/API/ApiController";

// -----------  product  ------------------
import EditeProductDashboard from "./EditeProductDashboard";
import AddProductDashboard from "./AddProductDashboard";

// -----------  category  ------------------
import AddCategoryDashboard from "./AddCategoryDashboard";
import EditCategoryDashboard from "./EditCategoryDashboard";

import ProductsTable from "./ProductsTable";
import AllProductsTable from "./AllProductsTable";

// import ProductContext from "./ProductContext";
import { ProductContext } from "./ProductContext";

import "./ProuductsDashboard.css";

//
//

const ProuductsDashboard = () => {
  //  ===========================================================================================================
  const {
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

    // ------------------
    loadAllCategoriesFromDataBase,
    allCategories,
    errorMsgOnLoadAllCategoriesFromDataBase,
    successMsgOnLoadAllCategoriesFromDataBase,
  } = useContext(ProductContext);
  //  ===========================================================================================================

  //---------------------------------   load on   ----------------------------------------

  useEffect(() => {
    (async () => await loadAllCategoriesFromDataBase())();
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     await loadAllCategoriesFromDataBase();
  //     if (allCategories.length > 0) {
  //       await loadAllProductsFromDatabase(allCategories[0].id); // Load products for the first category initially
  //     }
  //   })();
  // }, []);
  return (
    // <>
    //   <>
    //     {errorMsg && (
    //       <>
    //         {setTimeout(() => {
    //           Navigate("/NotFound404");
    //         }, 2000)}
    //       </>
    //     )}
    //   </>
    //   <>
    //     {errorMsg === "" && (

    <>
      {/* <ProductContext.Provider value={contextValue}> */}

      <div className="app__container dashboard_container">
        {/* --------------------------------------------------------------------------------
        ------------------------------ add new category Dashboard------------------------------
        ----------------------------------------------------------------------------------- */}
        {isAddCategoryVisible && (
          <div className="modal">
            <AddCategoryDashboard closeAddCategory={closeAddCategory} />
          </div>
        )}
        {/* --------------------------------------------------------------------------------
        ------------------------------ Edit category Dashboard ------------------------------
        ----------------------------------------------------------------------------------- */}
        {isEditCategoryVisible && (
          <div className="modal">
            <EditCategoryDashboard
              category={selectedCategory}
              closeEditCategory={closeEditCategory}
              key={selectedCategory.id}
            />
          </div>
        )}
        {/* --------------------------------------------------------------------------------
        ------------------------------ add new product Dashboard------------------------------
        ----------------------------------------------------------------------------------- */}
        {isAddProductVisible && (
          <div className="modal">
            <AddProductDashboard closeAddProduct={closeAddProduct} />
          </div>
        )}
        {/* --------------------------------------------------------------------------------
        ------------------------------ Edit Product Dashboard ------------------------------
        ----------------------------------------------------------------------------------- */}
        {isEditProductVisible && (
          <div className="modal">
            <EditeProductDashboard
              product={selectedProduct}
              closeEditProduct={closeEditProduct}
              key={selectedProduct.id}
            />
          </div>
        )}
        {/* --------------------------------------------------------------------------------
        ------------------------------  Product Table -------------------------------------
        ----------------------------------------------------------------------------------- */}
        <div className="">
          {/* <div className="dashboard_Section">
            <h1>MinouBox</h1>
          </div> */}
          {/* --------------------------------------------------------------------------------
        ------------------------------  product Dashboard controller------------------------------
        ----------------------------------------------------------------------------------- */}
          <div className="ProuductsDashboard_controller">
            <button onClick={() => openAddProductWindow()}>
              add new product
            </button>
            <button onClick={() => openAddCategoryWindow()}>
              add new Category
            </button>
          </div>
          <>
            <AllProductsTable />
          </>
          {/* {allCategories &&
            allCategories.map((category) => {
              return (
                <div key={category.id} id={category.id}>
                  <div className="Category_Name">
                    <h2>{category.name}</h2>
                    <button
                      className="custom__button"
                      onClick={() => selectCategory(category)}
                    >
                      edit category name
                    </button>
                  </div>

                  <ProductsTable
                    categoryId={category.id}
                    categoryName={category.name}
                  />
                </div>
              );
            })} */}
        </div>
      </div>
      {/* </ProductContext.Provider>  */}
    </>
    //       )}
    //     </>
    //   </>
  );
};

export default ProuductsDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ApiController } from "../../constants/API/ApiController";

// const AllProductsDashboard = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [allCategories, setAllCategories] = useState([]);
//   const [categoryName, setCategoryName] = useState([]);
//   const [user, setUser] = useState("");

//   const [ProductID, setProductID] = useState(0);
//   const [selectedcategoryName, setSelectedCategoryName] = useState("");
//   const [productName, setProductName] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [ingredients, setIngredients] = useState("");

//   const [priceDescription, setPriceDescription] = useState("");

//   const [productPrice, setProductPrice] = useState("");
//   const [productQuantity, setProductQuantity] = useState("");

//   const [selectedImage, setSelectedImage] = useState(null);

//   const [errorMsg, setErrorMsg] = useState([]);
//   const [successMsg, setSuccessMsg] = useState([]);

//   const Navigate = useNavigate();

//   //---------------------   load on   ----------------------------------------

//   useEffect(() => {
//     (async () => await loadAllCategoriesFromDataBase())();
//   }, []);

//   // --------------------------------   to load all data from backend  ---------------------------------
//   async function loadAllCategoriesFromDataBase() {
//     try {
//       // ------------------------------------------ get all categoryies -----------------------------------
//       const categoryResult = await axios.get(
//         ApiController.categories.getAllCategoriesAPI,
//         { withCredentials: true } // this line important
//       );
//       setAllCategories(categoryResult.data);
//       // console.log(categoryResult.data);
//       // ------------------------------------------ get all products -----------------------------------
//       const productResult = await axios.get(
//         ApiController.products.getAllProductsAPI,
//         // `${ApiController.categories.getAllProductsByCategoryAPI}/${categoryName}`,
//         { withCredentials: true } // this line important
//       );
//       setAllProducts(productResult.data);
//       // console.log(productResult.data);
//       // --------------------------  Handel error messages  --------------
//     } catch (error) {
//       if (error.response) {
//         setErrorMsg(error.response.data);
//         setTimeout(() => {
//           setErrorMsg("");
//         }, 2000);
//       } else if (error.request) {
//         // the request was made but no response was received
//         setErrorMsg("no response received from server.");
//         setTimeout(() => {
//           setErrorMsg("");
//         }, 2000);
//       } else {
//         //something happend insetting up the request
//         setErrorMsg("error in setting up the request.");
//         setTimeout(() => {
//           setErrorMsg("");
//         }, 2000);
//       }
//     }
//   }
//   // ----------------------------------------------------------  to add new product to backend ----------------------------------

//   const handleImageChange = (event) => {
//     setSelectedImage(event.target.files[0]);
//   };

//   //-------------------------------------------------------------------------

//   // async function addNewProduct(event) {
//   //   event.preventDefault();

//   //   if (!productName || !productPrice || !productQuantity) {
//   //     setErrorMsg("Please enter a name price , quantity for the product");
//   //     return;
//   //   }

//   //   try {
//   //     await axios.post("https://localhost:7005/api/Products", {
//   //       name: productName,
//   //       Price: productPrice,
//   //       quantity: productQuantity,
//   //       imageFile: selectedImage,
//   //     });
//   //     setSuccessMsg("product registered succesfully");

//   //     setProductID("");
//   //     setProductName("");
//   //     setProductPrice("");
//   //     setProductQuantity("");
//   //     setSelectedImage("");

//   //     await loadAllCategoriesFromDataBase();
//   //   } catch (err) {
//   //     console.log(err);
//   //     console.error(err.response.data);
//   //     setErrorMsg("Failed to save the product. Please try again.");
//   //   }
//   // }

//   async function addNewProduct(event) {
//     event.preventDefault();

//     if (!productName || !productPrice || !productQuantity) {
//       setErrorMsg("Please enter a name price , quantity for the product");
//       setTimeout(() => {
//         setErrorMsg("");
//       }, 2000);
//       return;
//     }

//     // Create a new FormData object
//     const formData = new FormData();

//     // Append each part of the data to the FormData object
//     formData.append("id", 1);

//     formData.append("categoryName", selectedcategoryName);

//     formData.append("name", productName);
//     formData.append("description", productDescription);
//     formData.append("ingredients", ingredients);
//     formData.append("priceDescription", priceDescription);
//     formData.append("Price", productPrice);
//     formData.append("quantity", productQuantity);
//     formData.append("imageFile", selectedImage); // Now this should work

//     try {
//       // Send the POST request, and set the 'Content-Type' header to 'multipart/form-data'.
//       // When sending a FormData object with Axios, it will automatically set the 'Content-Type' for you.
//       await axios.post("https://localhost:7005/api/Products", formData, {
//         withCredentials: true,
//       });

//       setSuccessMsg("product registered succesfully");
//       setTimeout(() => {
//         setSuccessMsg("");
//       }, 2000);

//       setProductID("");
//       setSelectedCategoryName("");
//       setProductName("");
//       setProductDescription("");
//       setIngredients("");
//       setPriceDescription("");
//       setProductPrice("");
//       setProductQuantity("");
//       setSelectedImage(null); // Use null for initial file state, not an empty string

//       await loadAllCategoriesFromDataBase();
//     } catch (error) {
//       // console.log(error);
//       // console.error(error.response.data);
//       // setErrorMsg("Failed to save the product. Please try again.");
//       // setTimeout(() => {
//       //   setErrorMsg("");
//       // }, 2000);

//       if (error.response) {
//         setErrorMsg(error.response.data);
//         setTimeout(() => {
//           setErrorMsg("");
//         }, 2000);
//       } else if (error.request) {
//         // the request was made but no response was received
//         setErrorMsg("no response received from server.");
//         setTimeout(() => {
//           setErrorMsg("");
//         }, 2000);
//       } else {
//         //something happend insetting up the request
//         setErrorMsg("error in setting up the request.");
//         setTimeout(() => {
//           setErrorMsg("");
//         }, 2000);
//       }
//     }
//   }
//   //---------------------------------------------------------------------------------------------------------------------------------------------------------------

//   // -----------------------------  edit data in frontend before use another function (put or patch) to send the edite to backend----------------------------------

//   async function editeProduct(product) {
//     setProductID(product.id);
//     setSelectedCategoryName(product.categoryName);
//     setProductName(product.name);
//     setProductDescription(product.productDescription);
//     setIngredients(product.ingredients);

//     setPriceDescription(product.priceDescription);
//     setProductPrice(product.price);
//     setProductQuantity(product.quantity);
//   }

//   // to clear inputs
//   async function clear(e) {
//     e.preventDefault();

//     setProductID("");
//     setSelectedCategoryName("");
//     setProductName("");
//     setProductDescription("");
//     setIngredients("");

//     setPriceDescription("");
//     setProductPrice("");
//     setProductQuantity("");
//     setSelectedImage(null);
//   }

//   // -----------------------------------   to refresh data from database ------------------------------
//   async function refresh(e) {
//     e.preventDefault();

//     setAllProducts("");

//     setProductID("");
//     setSelectedCategoryName("");
//     setProductName("");
//     setProductDescription("");
//     setIngredients("");

//     setPriceDescription("");
//     setProductPrice("");
//     setProductQuantity("");
//     setSelectedImage(null);

//     await loadAllCategoriesFromDataBase();
//   }

//   //------------------------------------------------------------------------------ update product functions ---------------------------------------------------------------------------------

//   //--------------------------------- put (update)------------------------------

//   async function put(event) {
//     event.preventDefault();

//     if (!productName || !productPrice || !productQuantity) {
//       setErrorMsg("Please enter a name price , quantity for the product");
//       setTimeout(() => {
//         setErrorMsg("");
//       }, 2000);

//       return;
//     }

//     try {
//       // https://localhost:7005/api/Products?id=15
//       // await axios.put(`https://localhost:7005/api/Products?id=${id}`, {
//       await axios.put(
//         `https://localhost:7005/api/Products/${ProductID}`,
//         {
//           id: ProductID,
//           categoryName: selectedcategoryName,
//           name: productName,
//           productDescription: productDescription,
//           ingredients: ingredients,
//           priceDescription: priceDescription,
//           Price: productPrice,
//           quantity: productQuantity,
//           // if selectedImage is null, it will be set to undefined, so it won't be included in the request
//           imageFile: selectedImage || undefined,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       setSuccessMsg("Product updated successfully");
//       setTimeout(() => {
//         setSuccessMsg("");
//       }, 2000);

//       setProductID("");
//       setSelectedCategoryName("");
//       setProductName("");
//       setProductDescription("");
//       setIngredients("");

//       setPriceDescription("");
//       setProductPrice("");
//       setProductQuantity("");
//       setSelectedImage(null);

//       await loadAllCategoriesFromDataBase();
//     } catch (error) {
//       // console.log(error);
//       // setErrorMsg("Failed to update the Product. Please try again.");
//       // setTimeout(() => {
//       //   setErrorMsg("");
//       // }, 2000);
//       if (error.response) {
//         setErrorMsg(error.response.data);
//         setTimeout(() => {
//           setErrorMsg("");
//         }, 2000);
//       } else if (error.request) {
//         // the request was made but no response was received
//         setErrorMsg("no response received from server.");
//         setTimeout(() => {
//           setErrorMsg("");
//         }, 2000);
//       } else {
//         //something happend insetting up the request
//         setErrorMsg("error in setting up the request.");
//         setTimeout(() => {
//           setErrorMsg("");
//         }, 2000);
//       }
//     }
//   }
//   // --------------------------------- patch (update) ------------------------------

//   async function patch(event) {
//     event.preventDefault();

//     if (!productName || !productPrice || !productQuantity) {
//       setErrorMsg("Please enter a name price , quantity for the product");

//       return;
//     }

//     try {
//       await axios.patch(
//         "https://localhost:7005/api/Products/" +
//           allProducts.find((u) => u.id === ProductID).id || ProductID,
//         {
//           // await axios.patch(`https://localhost:7005/api/Products/${id}`, {
//           id: ProductID,
//           categoryName: selectedcategoryName,
//           name: productName,
//           productDescription: productDescription,
//           ingredients: ingredients,
//           priceDescription: priceDescription,
//           Price: productPrice,
//           quantity: productQuantity,
//           // if selectedImage is null, it will be set to undefined, so it won't be included in the request
//           imageFile: selectedImage || undefined,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       setSuccessMsg("Product updated successfully");
//       setTimeout(() => {
//         setSuccessMsg("");
//       }, 2000);

//       setProductID("");
//       setSelectedCategoryName("");
//       setProductName("");
//       setProductDescription("");
//       setIngredients("");

//       setPriceDescription("");
//       setProductPrice("");
//       setProductQuantity("");
//       setSelectedImage(null);

//       await loadAllCategoriesFromDataBase();
//     } catch (error) {
//       // console.log(error);
//       // setErrorMsg("Failed to update the Product. Please try again.");
//       // setTimeout(() => {
//       //   setErrorMsg("");
//       // }, 2000);
//       if (error.response) {
//         setErrorMsg(error.response.data);
//         setTimeout(() => {
//           // setErrorMsg("");
//         }, 2000);
//       } else if (error.request) {
//         // the request was made but no response was received
//         setErrorMsg("no response received from server.");
//         setTimeout(() => {
//           // setErrorMsg("");
//         }, 2000);
//       } else {
//         //something happend insetting up the request
//         setErrorMsg("error in setting up the request.");
//         setTimeout(() => {
//           // setErrorMsg("");
//         }, 2000);
//       }
//     }
//   }

//   //--------------------------------- to delete product from database ------------------------------
//   async function deleteProduct(id) {
//     if (!window.confirm("Are you sure you want to delete this product?")) {
//       return;
//     }

//     try {
//       await axios.delete(`https://localhost:7005/api/Products/${id}`, {
//         withCredentials: true,
//       });
//       setSuccessMsg("Product deleted successfully");
//       setTimeout(() => {
//         setSuccessMsg("");
//       }, 2000);
//       await loadAllCategoriesFromDataBase();
//     } catch (error) {
//       // console.log(error);
//       // setErrorMsg("Failed to delete the Product. Please try again.");
//       // setTimeout(() => {
//       //   setErrorMsg("");
//       // }, 2000);
//       if (error.response) {
//         setErrorMsg(error.response.data);
//         setTimeout(() => {
//           // setErrorMsg("");
//         }, 2000);
//       } else if (error.request) {
//         // the request was made but no response was received
//         setErrorMsg("no response received from server.");
//         setTimeout(() => {
//           // setErrorMsg("");
//         }, 2000);
//       } else {
//         //something happend insetting up the request
//         setErrorMsg("error in setting up the request.");
//         setTimeout(() => {
//           // setErrorMsg("");
//         }, 2000);
//       }
//     }
//   }

//   //--------------------------------- increase product quantity ------------------------------

//   // Function to increase quantity for a specific Product
//   const increaseProductQuantity = async (productId) => {
//     try {
//       const productToUpdate = allProducts.find(
//         (product) => product.id === productId
//       );
//       const updatedQuantity = productToUpdate.quantity + 1;

//       await axios.patch(`https://localhost:7005/api/Products/${productId}`, {
//         ...productToUpdate,
//         quantity: updatedQuantity,
//       });

//       // to refresh the data from back end
//       await loadAllCategoriesFromDataBase();
//     } catch (err) {
//       console.log(err);
//       setErrorMsg("Failed to update the product quantity. Please try again.");
//       setTimeout(() => {
//         setErrorMsg("");
//       }, 2000);
//     }
//   };

//   //--------------------------------- decreass product quantity ------------------------------

//   // Function to decrease quantity for a specific product
//   const decreaseProductQuantity = async (productId) => {
//     try {
//       const productToUpdate = allProducts.find(
//         (product) => product.id === productId
//       );
//       const updatedQuantity = productToUpdate.quantity - 1;

//       await axios.patch(`https://localhost:7005/api/Products/${productId}`, {
//         ...productToUpdate,
//         quantity: updatedQuantity,
//       });

//       await loadAllCategoriesFromDataBase();
//     } catch (err) {
//       console.log(err);
//       setErrorMsg("Failed to update the product quantity. Please try again.");
//       setTimeout(() => {
//         setErrorMsg("");
//       }, 2000);
//     }
//   };

//   return (
//     // <>
//     //   <>
//     //     {errorMsg && (
//     //       <>
//     //         {setTimeout(() => {
//     //           Navigate("/NotFound404");
//     //         }, 2000)}
//     //       </>
//     //     )}
//     //   </>
//     //   <>
//     //     {errorMsg === "" && (
//     //       <>
//     <div>
//       <div>
//         <h2>Product details</h2>
//         <h2>{JSON.stringify(errorMsg)}</h2>
//         <form>
//           <div>
//             <label htmlFor="ProductID">Product ID:</label>

//             <input
//               // type="hidden"
//               id="ProductID"
//               value={ProductID}
//               onChange={(e) => {
//                 // setId(e.target.value);
//               }}
//             />
//           </div>
//           <div>
//             <label htmlFor="categoryName">category Name :</label>
//             {/* <input
//               type="text"
//               id="categoryName"
//               value={categoryName}
//               onChange={(e) => {
//                 setCategoryName(e.target.value);
//               }}
//             /> */}
//             <select
//               value={selectedcategoryName}
//               placeholder="choose category"
//               onChange={(e) => {
//                 setSelectedCategoryName(e.target.value);
//               }}
//             >
//               {allCategories &&
//                 allCategories.map((category) => {
//                   return <option value={category.name}>{category.name}</option>;
//                 })}
//             </select>
//           </div>
//           <div>
//             <label htmlFor="name">Product Name:</label>
//             <input
//               type="text"
//               id="name"
//               value={productName}
//               onChange={(e) => {
//                 setProductName(e.target.value);
//               }}
//             />
//           </div>
//           <div>
//             <label htmlFor="productDescription">Product Description:</label>
//             <input
//               type="text"
//               id="productDescription"
//               value={productDescription}
//               onChange={(e) => {
//                 setProductDescription(e.target.value);
//               }}
//             />
//           </div>
//           <div>
//             <label htmlFor="ingredients">Product ingredients:</label>
//             <input
//               type="text"
//               id="ingredients"
//               value={ingredients}
//               onChange={(e) => {
//                 setIngredients(e.target.value);
//               }}
//             />
//           </div>
//           <div>
//             <label htmlFor="priceDescription">Price Description:</label>
//             <input
//               type="text"
//               id="priceDescription"
//               value={priceDescription}
//               onChange={(e) => {
//                 setPriceDescription(e.target.value);
//               }}
//             />
//           </div>
//           <div>
//             <label htmlFor="quantity">Product quantity:</label>
//             <input
//               type="number"
//               id="quantity"
//               value={productQuantity}
//               onChange={(e) => {
//                 setProductQuantity(e.target.value);
//               }}
//             />
//           </div>
//           <div>
//             <label htmlFor="price">Product price:</label>
//             <input
//               type="text"
//               id="price"
//               value={productPrice}
//               onChange={(e) => {
//                 setProductPrice(e.target.value);
//               }}
//             />
//           </div>
//           <div>
//             <label htmlFor="image">Product image:</label>
//             <input type="file" id="image" onChange={handleImageChange} />
//           </div>
//           {/* <button
//           type="submit"
//           // onClick={save(brand)}
//         ></button> */}
//           <button onClick={addNewProduct}>add New Product</button>
//           <button onClick={patch}>patch</button>
//           <button onClick={put}>put</button>
//           <button onClick={clear}>clear</button>
//           <button onClick={refresh}>refresh</button>
//         </form>
//         <br></br>
//         products --------
//         <div className="app__content section__padding MinouBox">
//           <div className="section_header">
//             <h1>MinouBox</h1>
//           </div>
//           {allCategories &&
//             allCategories.map((category) => {
//               return (
//                 <>
//                   <div className="section_Text_container">
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <h2>{category.name}</h2>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                   </div>
//                   <div className="ProductsItems_container">
//                     {allProducts &&
//                       allProducts.map((product) => {
//                         return (
//                           <div>
//                             <div
//                               className="Product_container "
//                               id={`${product.categoryName}_product_${product.id}`}
//                             >
//                               <span
//                                 className="tag"
//                                 onClick={() => {
//                                   const containerEl = document.getElementById(
//                                     `${product.categoryName}_product_${product.id}`
//                                   );
//                                   containerEl.classList.toggle("flipped");
//                                 }}
//                               >
//                                 <p>Ingredients</p>
//                               </span>
//                               <div className="front">
//                                 <div
//                                   className="product_img-container"
//                                   onClick={() => {
//                                     const containerEl = document.getElementById(
//                                       `${product.categoryName}_product_${product.id}`
//                                     );
//                                     containerEl.classList.toggle("flipped");
//                                   }}
//                                 >
//                                   {/* <img src={productImage} alt="product-img" /> */}
//                                   <img
//                                     src={`data:image/jpeg;base64,${product.imageFile}`}
//                                     alt="product-img"
//                                   />
//                                 </div>
//                                 <div
//                                   className="product_details"
//                                   onClick={() => {
//                                     const containerEl = document.getElementById(
//                                       `${product.categoryName}_product_${product.id}`
//                                     );
//                                     containerEl.classList.toggle("flipped");
//                                   }}
//                                 >
//                                   <p className="product_Title">
//                                     <span>Name: </span>
//                                     {product.name}
//                                   </p>
//                                   <p className="product_Description">
//                                     Description: {product.description}
//                                   </p>
//                                   <p className="categoryName">
//                                     category Name: {product.categoryName}
//                                   </p>
//                                   <div>Quantity: {product.quantity}</div>
//                                   <div>created at : {product.created_at}</div>
//                                   <p className="product_Price">
//                                     {product.priceDescription} : EGP
//                                     <span>{product.price.toFixed(2)}</span>
//                                   </p>
//                                 </div>
//                                 <div className="product_buttons_handler">
//                                   {product.quantity <= 0 ? (
//                                     <div className="product_countHandler">
//                                       <span
//                                         className="custom__button"
//                                         onClick={() =>
//                                           decreaseProductQuantity(product.id)
//                                         }
//                                       >
//                                         -
//                                       </span>
//                                       {/* <input
//                                         // value={cartItems[ProductID]}
//                                         onChange={(e) =>
//                                           updateCartItemCount(
//                                             Number(e.target.value),
//                                             id
//                                           )
//                                         }
//                                       /> */}
//                                       <span
//                                         className="custom__button"
//                                         onClick={() =>
//                                           increaseProductQuantity(product.id)
//                                         }
//                                       >
//                                         +
//                                       </span>
//                                     </div>
//                                   ) : (
//                                     <span
//                                       className="custom__button"
//                                       onClick={() =>
//                                         increaseProductQuantity(product.id)
//                                       }
//                                     >
//                                       Add To Cart
//                                     </span>
//                                   )}
//                                   <span
//                                     className="custom__button"
//                                     onClick={() => deleteProduct(product.id)}
//                                   >
//                                     Delete
//                                   </span>
//                                   <span
//                                     className="custom__button"
//                                     onClick={() => editeProduct(product)}
//                                   >
//                                     Edit
//                                   </span>
//                                 </div>
//                                 {product.quantity <= 0 ? (
//                                   <span
//                                     className="custom__button"
//                                     onClick={() =>
//                                       increaseProductQuantity(product.id)
//                                     }
//                                   >
//                                     Add
//                                   </span>
//                                 ) : (
//                                   <>
//                                     <span
//                                       className="custom__button"
//                                       onClick={() =>
//                                         increaseProductQuantity(product.id)
//                                       }
//                                     >
//                                       Increase
//                                     </span>
//                                     <span
//                                       className="custom__button"
//                                       onClick={() =>
//                                         decreaseProductQuantity(product.id)
//                                       }
//                                     >
//                                       Decrease
//                                     </span>
//                                   </>
//                                 )}
//                               </div>
//                               <div
//                                 className="back"
//                                 onClick={() => {
//                                   const containerEl = document.getElementById(
//                                     `${product.categoryName}_product_${product.id}`
//                                   );
//                                   containerEl.classList.toggle("flipped");
//                                 }}
//                               >
//                                 <h2>Ingredients: </h2>
//                                 <p>{product.ingredients}</p>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                   </div>
//                 </>
//               );
//             })}
//         </div>
//       </div>
//     </div>
//     //         </>
//     //       )}
//     //     </>
//     //   </>
//   );
// };

// export default AllProductsDashboard;

//
//
//
//
//
//
