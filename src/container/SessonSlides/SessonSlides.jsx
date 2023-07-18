import React from "react";

import "./SessonSlides.css";

import ImageSlider from "../ImageSlider/ImageSlider";
import { SessonData } from "../../constants/SessonData";

const SessonSlides = () => (
  <div className="app__content SessonSlides">
    <ImageSlider slides={SessonData} />
  </div>
);

export default SessonSlides;
