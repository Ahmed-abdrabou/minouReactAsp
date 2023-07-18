import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";

import "./product.css";

export const Product = (props) => {
  const {
    id,
    productName,
    pricedescription,
    productDescription,
    price,
    productImage,
    ingredients,
  } = props.data;

  const { addToCart, cartItems, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  const cartItemCount = cartItems[id];

  const handleClick = () => {
    const containerEl = document.getElementById(`product_${id}`);
    containerEl.classList.toggle("flipped");
  };
  return (
    <div className="Product_container " id={`product_${id}`}>
      <span className="tag" onClick={handleClick}>
        <p>Ingredients</p>
      </span>
      <div className="front">
        <div className="product_img-container" onClick={handleClick}>
          <img src={productImage} alt="product-img" />
        </div>
        <div className="product_details" onClick={handleClick}>
          <p className="product_Title">{productName}</p>
          <p className="product_Description">{productDescription}</p>
          <p className="product_Price">
            {pricedescription} : EGP<span>{price.toFixed(2)}</span>
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
                value={cartItems[id]}
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
          {/* <span>{cartItemCount}</span>
        <span
          className="custom__button product_button"
          onClick={() => removeFromCart(id)}
        >
          Remove From Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
        </span> */}
        </div>
      </div>
      <div className="back" onClick={handleClick}>
        <h2>Ingredients:</h2>
        <p>{ingredients}</p>
      </div>
    </div>
  );
};
//
//
//
//
// import React, { useContext } from "react";
// import { ShopContext } from "../../container/context/shop-context";

// import "./product.css";

// export const Product = (props) => {
//   const { id, productName, price, productImage } = props.data;
//   const { addToCart, cartItems } = useContext(ShopContext);

//   const cartItemCount = cartItems[id];

//   return (
//     <div className="product">
//       <img src={productImage} />
//       <div className="description">
//         <p>
//           <b>{productName}</b>
//         </p>
//         <p> ${price}</p>
//       </div>
//       <button className="addToCartBttn" onClick={() => addToCart(id)}>
//         Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
//       </button>
//     </div>
//   );
// };
