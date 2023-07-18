import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Product = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const [user, setUser] = useState("");

  const [productQuantity, setProductQuantity] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [errorMsg, setErrorMsg] = useState([]);
  const [successMsg, setSuccessMsg] = useState([]);

  const {
    id,
    // categoryName,
    name,
    description,
    priceDescription,
    price,
    imageFile,
    ingredients,
  } = props.data;

  const categoryName = props.categoryName;

  const cartItems = "";
  const cartItemCount = "";
  const removeFromCart = "";
  const updateCartItemCount = "";
  const addToCart = "";

  const handleClick = () => {
    const containerEl = document.getElementById(
      `${categoryName}_product_${id}`
    );
    containerEl.classList.toggle("flipped");
    console.log(props);
  };

  return (
    <div className="Product_container " id={`${categoryName}_product_${id}`}>
      <span className="tag" onClick={handleClick}>
        <p>Ingredients</p>
      </span>
      <div className="front">
        <div className="product_img-container" onClick={handleClick}>
          {/* <img src={productImage} alt="product-img" /> */}
          <img src={`data:image/jpeg;base64,${imageFile}`} alt="product-img" />
        </div>
        <div className="product_details" onClick={handleClick}>
          <p className="product_Title">{name}</p>
          <p className="product_Description">{description}</p>
          <p className="categoryName">{categoryName}</p>
          <p className="product_Price">
            {priceDescription} : EGP<span>{price.toFixed(2)}</span>
          </p>
        </div>
        <div className="product_buttons_handler">
          {cartItemCount > 0 ? (
            <div className="product_countHandler">
              <span
                className="custom__button"
                onClick={() => removeFromCart(id)}
              >
                -
              </span>
              <input
                // value={cartItems[ProductID]}
                onChange={(e) =>
                  updateCartItemCount(Number(e.target.value), id)
                }
              />
              <span className="custom__button" onClick={() => addToCart(id)}>
                +
              </span>
            </div>
          ) : (
            <span className="custom__button" onClick={() => addToCart(id)}>
              Add To Cart
            </span>
          )}
        </div>
      </div>
      <div className="back" onClick={handleClick}>
        <h2>Ingredients:</h2>
        <p>{ingredients}</p>
      </div>
    </div>
  );
};
