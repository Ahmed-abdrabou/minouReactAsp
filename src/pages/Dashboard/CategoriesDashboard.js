import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ApiController } from "../../constants/API/ApiController";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
// -----------  category  ------------------
import AddCategoryDashboard from "./AddCategoryDashboard";
import EditCategoryDashboard from "./EditCategoryDashboard";

// import ProductContext from "./ProductContext";
import { ProductContext } from "./ProductContext";

import "./ProuductsDashboard.css";

//
//

const CategoriesDashboard = () => {
  const [errorMsg, setErrorMsg] = useState([]);
  const [successMsg, setSuccessMsg] = useState([]);
  //  ===========================================================================================================
  const {
    showToast,
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
  //--------------------------------- to delete category from database ------------------------------
  async function deleteCategory(id) {
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
          await axios.delete("https://localhost:7005/api/Categories/" + id, {
            withCredentials: true,
          });
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

  async function UpdateProductsQuntity() {}
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
              key={selectedCategory.id}
            />
          </div>
        )}

        {/* --------------------------------------------------------------------------------
        ------------------------------  categories Table -------------------------------------
        ----------------------------------------------------------------------------------- */}
        <div className="app__content section__padding">
          {/* --------------------------------------------------------------------------------
        ------------------------------  category Dashboard controller------------------------------
        ----------------------------------------------------------------------------------- */}
          <div className="ProuductsDashboard_controller">
            <button
              className="custom__button"
              onClick={() => openAddCategoryWindow()}
            >
              add new Category
            </button>
          </div>

          <table className="table">
            <thead className="thead-primary">
              <tr>
                <th>Id:</th>
                <th>category</th>
                <th>products Count:</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {allCategories &&
                allCategories.map((category, index) => {
                  return (
                    <tr
                      className="alert"
                      id={`$category_${category.id}`}
                      key={`$category_${category.id}`}
                    >
                      <td>
                        <div>{index + 1}</div>
                      </td>
                      {/* img */}

                      {/*category_Title */}
                      <td>
                        <div className="category_Title">{category.name}</div>
                      </td>
                      {/* products_Quantity */}
                      <td className="products_Quantity">
                        <div className="input-group">
                          {category.productCount}
                        </div>
                      </td>
                      <td>
                        <div className="tabel_controller">
                          <button onClick={() => selectCategory(category)}>
                            edit
                          </button>
                          <button onClick={() => deleteCategory(category.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      {/* </ProductContext.Provider>  */}
    </>
    //       )}
    //     </>
    //   </>
  );
};

export default CategoriesDashboard;
