import React from "react";

import "./SpecialOccasionCakes.css";

import { SpecialOccasionCakes_img } from "../../constants/SpecialOccasionCakes_img";

const SpecialOccasionCakes = () => (
  <div className="section__padding app__content SpecialOccasionCakes  reveal">
    <div className="section_header">
      <h1>Special Occasion Cakes</h1>
      <p>Minou loves to be a part of your happy moments.</p>
    </div>
    <div className="SpecialOccasionCakes_Cards">
      {SpecialOccasionCakes_img.map((card, index) => {
        return (
          <div className="SpecialOccasionCakes_Card" key={index}>
            <div className="SpecialOccasionCakes_img-container">
              <img src={card.image} alt="SpecialOccasionCakes_img" />
            </div>
            <h3 className="Card_Title">{card.title}</h3>
            <p className="Card_Descrition">{card.description}</p>
          </div>
        );
      })}
    </div>
  </div>
);

export default SpecialOccasionCakes;
