import React, { useState } from "react";

export const IndividualProduct = ({ individualProduct, addToCart }) => {
  const [qty, setQty] = useState();
  // console.log(individualProduct);
  const handleAddToCart = () => {
    addToCart(individualProduct);
    setQty(individualProduct.qty);

    console.log(individualProduct.qty);
  };

  const handleClick = () => {
    const containerEl = document.getElementById(
      `product_${individualProduct.ID}`
    );
    containerEl.classList.toggle("flipped");
  };

  return (
    <div className="Product_container " id={`product_${individualProduct.ID}`}>
      <span className="tag" onClick={handleClick}>
        <p>Ingredients</p>
      </span>
      <div className="front">
        <div className="product_img-container" onClick={handleClick}>
          <img src={individualProduct.url} alt="product-img" />
        </div>
        <div className="product_details" onClick={handleClick}>
          <p className="product_Title">{individualProduct.title}</p>
          <p className="product_Description">{individualProduct.description}</p>
          <p className="product_Price">
            {individualProduct.priceDescription} : EGP
            <span>{individualProduct.price.toFixed(2)}</span>
          </p>
        </div>
        {/* <div className="custom__button" onClick={handleAddToCart}>
          ADD TO CART
        </div> */}

        <div className="product_buttons_handler">
          {qty > 0 ? (
            <div className="product_countHandler">
              <span className="custom__button" onClick={() => null}>
                -
              </span>
              <input
                value={qty}
                onChange={
                  (e) => null
                  // Number(e.target.value)
                }
              />
              <span className="custom__button" onClick={() => null}>
                +
              </span>
            </div>
          ) : (
            <span className="custom__button" onClick={handleAddToCart}>
              ADD TO CART
            </span>
          )}
        </div>
      </div>
      <div className="back" onClick={handleClick}>
        <h2>Ingredients:</h2>
        <p>{individualProduct.ingredients}</p>
      </div>
    </div>
  );
};
