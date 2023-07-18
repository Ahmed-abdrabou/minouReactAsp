import React, { useState } from "react";

import { BackGround_images } from "../../constants/BackGround_images";
import "./BackGroundSlider.css";

const BackGroundSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const autoslide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  setTimeout(autoslide, 10000);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className=" app__content BackGroundSlider">
      {BackGround_images.map((slide, index) => {
        return (
          <div className="BackGroundSlider-container">
            <div
              className={
                index === current ? "BackGroundSlide active" : "BackGroundSlide"
              }
              key={index}
            >
              {index === current && (
                <img
                  src={slide.image}
                  alt="BackGroundSlide_image"
                  className="BackGroundSlide_image"
                />
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default BackGroundSlider;
