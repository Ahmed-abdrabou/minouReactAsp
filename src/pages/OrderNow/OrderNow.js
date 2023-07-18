import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ShopContext } from "../../container/context/shop-context";
import emailjs from "@emailjs/browser";

import "./OrderNow.css";

const OrderNow = () => {
  const navigate = useNavigate();
  const { randomId } = useContext(ShopContext);

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
        "template_vwgvl7c",
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
    navigate("/minoupastryshop");
  };
  return (
    <div
      className="app__container section__padding OrderNow_container"
      id="OrderNow"
    >
      <div className="section_header">
        <h1>Make a Spesical Cake Now</h1>
      </div>
      {
        <form ref={formRef} onSubmit={sendEmail}>
          <input
            type="text"
            name="OrderNow_details"
            value={" >> order Date : " + date + " >><< order time: << " + time}
          />
          <div className="OrderNow_details">
            <div className="OrderNow_Info">
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
                placeholder="please descrip your full address:"
                required
              />
            </div>
            <div className="OrderNow_Info">
              <p>Please put your order details: </p>
              <div className="OccasionDate">
                <label for="Date">Occasion Date: </label>
                <input type="date" id="Date" name="OccasionDate" />
              </div>
              <input
                type="text"
                name="occationDescription"
                placeholder="Occation description:"
                required
              />
              <textarea
                type="text"
                name="Notes"
                placeholder="please let me know if you have any comment:"
              />
            </div>
          </div>
          <div className="OrderNow_control">
            <div className="order_id">
              <input
                type="text"
                name="OrderId"
                value={"Your Order Id : " + randomId()}
                style={{ border: "none" }}
                disabled
              />
            </div>
            <button type="submit">Send Order To Kitchen</button>
            {/* <span className="custom__button" onClick={sendEmail}>
            send
          </span> */}
          </div>
        </form>
      }
    </div>
  );
};

// const OrderNow = () => (
//   <div className="OrderNow app__container">
//     <div className="image_container"></div>

//     <form>
//       <div className="input_container">
//         <label for="name">
//           Full Name: <span> *(required)</span>
//         </label>
//         <input type="text" id="name" placeholder="Write Your Name" required />
//       </div>
//       <div className="input_container">
//         <label for="number">
//           Number: <span> *(required)</span>
//         </label>
//         <input
//           type="number"
//           id="number"
//           placeholder="Write Your Number"
//           required
//         />
//       </div>

//       <div className="input_container">
//         <label for="Date">
//           Occasion Date: <span> *(required)</span>
//         </label>
//         <input type="date" id="Date" />
//       </div>
//       <div className="input_container">
//         <label for="descritpion">
//           order descritpion : <span> *(required)</span>
//         </label>
//         <textarea
//           type="text"
//           id="name"
//           placeholder="Write The descritpion of the order"
//           required
//         />
//       </div>
//       <input type="text" name="city" placeholder="city:" required />
//       <textarea
//         type="text"
//         name="FullAdress"
//         placeholder="please inter yor full address:"
//         required
//       />
//       <input
//         type="text"
//         name="OrderId"
//         value={"Your Order Id : " + randomId()}
//         style={{ border: "none" }}
//       />
//       <span className="custom__button">Send Order</span>
//     </form>
//   </div>
// );

export default OrderNow;
