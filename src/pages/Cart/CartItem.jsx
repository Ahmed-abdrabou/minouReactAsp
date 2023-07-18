import React, { useContext } from "react";
import { ShopContext } from "../../container/context/shop-context";

import "./CartItem.css";

export const CartItem = (props) => {
  const {
    id = "",
    productName = "",
    productDescription = "",
    price = 0,
    pricedescription = "",
    productImage = "",
  } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="cartItem_container">
      <div className="cartItem_img-container">
        <img src={productImage} alt="productImage" />
      </div>

      <div className="cartItem_Details">
        <div className="description_text">
          <p className="cartItem_Title">{productName}</p>
          <p className="cartItem_Description">{productDescription}</p>
          <p className="cartItem_Price">
            {pricedescription} : EGP <span>{price.toFixed(2)}</span>
          </p>
        </div>
        <div className="countHandler">
          <span className="custom__button" onClick={() => removeFromCart(id)}>
            -
          </span>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <span className="custom__button" onClick={() => addToCart(id)}>
            +
          </span>
        </div>
      </div>
    </div>
  );
};
