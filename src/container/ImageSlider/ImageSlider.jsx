import React, { useState } from "react";

import { SessonData } from "../../constants/SessonData";
import "./ImageSlider.css";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const textUP = [
    "Minou's Box of Happy bites is ready to take you to a world full of flavors.",
    "Moms deserve all of our love ❤ ",
    "Say Hi to our Minou's new oatmeal cookies!",
  ];
  const textDOWN = [
    "Place your order now and get a free mother's day card!",
    "Minou's special cake is ready to celebrate Mother's day",
    "For all oatmeal lovers and the ones in need for a healthy snack, the new cookies are perfect match.. You can have them while working, before your training or even a light snack before bedtime.",
  ];

  const autoslide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  setTimeout(autoslide, 10000);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="app__content slider">
      {SessonData.map((slide, index) => {
        return (
          <div className="slider-container">
            <div
              className={index === current ? "slideImg active" : "slideImg"}
              key={index}
            >
              {index === current && (
                <img
                  src={slide.image}
                  alt="slide_image"
                  className="slide_image"
                />
              )}
            </div>
            <div
              className={
                index === current ? "slider_text active" : "slider_text"
              }
              key={index}
            >
              {index === current && (
                <div>
                  <div className="up-text">{textUP[current]}</div>
                  <div className="down-text">{textDOWN[current]}</div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
