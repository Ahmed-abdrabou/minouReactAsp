import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProductsItems_compined } from "../../constants/ProductsItems_compined";

import { ShopContext } from "../../container/context/shop-context";

import "./CheckOutByEmail.css";

import emailjs from "@emailjs/browser";

export const CheckOutByEmail = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    getTotalCartAmount,
    getTotalCartNumbers,
    clearCart,
    randomId,
  } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const totalNumbers = getTotalCartNumbers();
  const DeliveryFess = 30;

  const formRef = useRef();

  const currentDate = new Date();
  const date = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  // const date = currentDate.toLocaleDateString("en-US");

  const time = currentDate.toLocaleTimeString("en-US");

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_vngwsne",
        "template_n9choa8",
        formRef.current,
        "LTN3V3nqsHLrDm3qn"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    clearCart();
    navigate("/");
  };
  return (
    <div className="CheckOut_container">
      <h2>Your Basket</h2>
      <div className="CheckOut_form_Control">
        <span
          className="custom__button"
          onClick={() => {
            navigate("/cart");
          }}
        >
          Return To The Shopping Basket
        </span>
        <span
          className="custom__button"
          onClick={() => {
            navigate("/minoupastryshop");
            clearCart();
          }}
        >
          Place New Order
        </span>
      </div>
      {totalAmount > 0 ? (
        <form ref={formRef} onSubmit={sendEmail} className="CheckOut_form">
          <div className="CheckOut_form_container">
            <div className="CheckOut_items_container">
              <div className="CheckOut_customerInfo">
                <p>Please put your Info: </p>
                <input
                  type="text"
                  name="UserName"
                  placeholder="name :"
                  required
                />
                <input
                  type="number"
                  name="PhoneNumber"
                  placeholder="phone number :"
                  required
                />
                <input type="text" name="city" placeholder="city:" required />
                <textarea
                  type="text"
                  name="FullAdress"
                  placeholder="please inter yor full address:"
                  required
                />
                <textarea
                  type="text"
                  name="Notes"
                  placeholder="please let me know if you have any comment:"
                />

                <div className="CheckOut_items">
                  {ProductsItems_compined.map((product) => {
                    if (cartItems[product.id] !== 0) {
                      return (
                        <div className="CheckOut_item">
                          <input
                            type="text"
                            name="ProductId"
                            value={product.id}
                          />
                          <p className="ItemName">
                            <big>Item: </big> {product.productName}{" "}
                            {product.productDescription}
                          </p>
                          <p className="ItemTotalPrice">
                            <big>No of Items: </big> {cartItems[product.id]} x{" "}
                            {product.price} EGP ={" "}
                            {cartItems[product.id] * product.price} EGP
                          </p>
                          <input
                            type="text"
                            name="ItemDetails"
                            value={
                              "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<" +
                              product.productName +
                              product.productDescription +
                              " }}-----((  " +
                              cartItems[product.id] +
                              " x " +
                              product.pricedescription +
                              " " +
                              product.price +
                              " EGP = " +
                              cartItems[product.id] * product.price +
                              " EGP ))" +
                              ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
                            }
                          />
                        </div>
                      );
                    }
                  })}
                </div>

                <div className="CheckOut_total">
                  <p>
                    Total Items: <span> {totalNumbers} </span> items
                  </p>
                  <p>
                    Subtotal: <span> {totalAmount.toFixed(2)} </span>
                    EGP
                  </p>
                  <p>
                    deleviry fees: <span> {DeliveryFess.toFixed(2)} </span>
                    EGP
                  </p>
                  <p>
                    <big>Total: </big>
                    <span> {(totalAmount + DeliveryFess).toFixed(2)} </span>
                    EGP
                  </p>

                  <input
                    type="text"
                    name="ItemTotalCostDetails"
                    value={
                      "Total Items Number: (( " +
                      totalNumbers +
                      "  ))  Subtotal Cost: (( " +
                      totalAmount +
                      "  EGP))  Delivery Fees: (( " +
                      DeliveryFess +
                      "  EGP))  Total Cost: (( " +
                      (totalAmount + DeliveryFess) +
                      "  EGP)) " +
                      " >> order Date : " +
                      date +
                      " >><< order time: << " +
                      time
                    }
                  />
                </div>

                <div className="order_id">
                  <input
                    type="text"
                    name="OrderId"
                    value={"Your Order Id : " + randomId()}
                    style={{ border: "none" }}
                  />
                </div>

                <button type="submit">Send Order To Kitchen</button>
                {/* <span className="custom__button" onClick={sendEmail}>
                sss
              </span> */}
              </div>
            </div>
          </div>
        </form>
      ) : (
        <h1> Your Shopping Cart is Empty : )</h1>
      )}
    </div>
  );
};
