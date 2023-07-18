import React from "react";

// import { images } from "../../constants";
import "./BestSeller.css";

import { BestSeller_img } from "../../constants/BestSeller_img";

const BestSeller = () => (
  <div className="app__content BestSeller" id="BestSeller">
    <div className="section_header">
      <h1>BestSeller</h1>
    </div>
    <div className="BestSeller_Cards">
      {BestSeller_img.map((card, index) => {
        return (
          <div className="BestSeller_Card" key={index}>
            <div className="BestSeller_img-container">
              <img src={card.image} alt="BestSeller_img" />
            </div>
            <h3 className="Card_Title">{card.title}</h3>
            <p className="Card_Price">{card.price} LE</p>
          </div>
        );
      })}
    </div>
  </div>
);

export default BestSeller;
