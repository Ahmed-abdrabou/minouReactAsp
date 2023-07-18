import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";

import "./product.css";

export const ProductCupcakes = (props) => {
  const {
    id,
    productName,
    pricedescription,
    productDescription,
    price,
    productImage,
  } = props.data;
  const { addToCart, cartItems, removeFromCart } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  return (
    <div className="Product_container">
      <div className="product_img-container">
        <img src={productImage} />
      </div>
      <div className="description">
        <p className="product_Title">{productName}</p>
        <p className="product_Description">{productDescription}</p>
        <p className="product_Price">
          {pricedescription} : EGP {price.toFixed(2)}
        </p>
      </div>
      <div className="product_buttons_handler">
        <span className="custom__button " onClick={() => addToCart(id)}>
          Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
        </span>
        {/* <span>{cartItemCount}</span>
        <span
          className="custom__button product_button"
          onClick={() => removeFromCart(id)}
        >
          Remove From Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
        </span> */}
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
