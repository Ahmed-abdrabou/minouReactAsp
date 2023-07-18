import React from "react";

import "./SpecialOrderCakes.css";

import { SpecialOrderCakesImages } from "../../constants/SpecialOrderCakesImages";

const SpecialOrderCakes = () => (
  <div className="app__content SpecialOrderCakesImage">
    <div className="SpecialOrderCakes_container">
      {SpecialOrderCakesImages.map((img, index) => {
        return (
          <div className="SpecialOrderCakes" key={index}>
            <div className="SpecialOrderCake">
              <img src={img.image} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default SpecialOrderCakes;
