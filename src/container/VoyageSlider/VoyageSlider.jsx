import React from "react";

import "./VoyageSlider.css";
// import { VoyageSliderImages } from "../../constants/VoyageSliderImages";
import { SlideshowImages } from "../../constants/SlideshowImages";
import { images } from "../../constants";

const delay = 4500;

const VoyageSlider = () => {
  const [indexnumber, setindexnumber] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setindexnumber((previndexnumber) =>
          previndexnumber === SlideshowImages.length - 1 ||
          previndexnumber > SlideshowImages.length - 1
            ? 0
            : previndexnumber + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [indexnumber]);

  return (
    <div className="app__content VoyageSlider">
      <div className="cards_container">
        <div
          className={
            indexnumber === 0
              ? `card_container nextcard${indexnumber + 2}`
              : indexnumber === 1
              ? `card_container prevcard${indexnumber - 1}`
              : `card_container currentcard${indexnumber - 1}`
          }
        >
          <div className="card_image_container">
            <img src={images.header_img1} alt="" />
          </div>
        </div>
        <div
          className={
            indexnumber === 0
              ? `card_container currentcard${indexnumber + 1}`
              : indexnumber === 1
              ? `card_container nextcard${indexnumber + 1}`
              : `card_container prevcard${indexnumber - 2}`
          }
        >
          <div className="card_image_container">
            <img src={images.header_img2} alt="" />
          </div>
        </div>
        <div
          className={
            indexnumber === 0
              ? `card_container prevcard${indexnumber}`
              : indexnumber === 1
              ? `card_container currentcard${indexnumber}`
              : `card_container nextcard${indexnumber}`
          }
        >
          <div className="card_image_container">
            <img src={images.header_img3} alt="" />
          </div>
        </div>
      </div>
      <div className="app_bg_container">
        <div
          className={
            indexnumber === 0
              ? `app__bgg__image next--image${indexnumber + 2}`
              : indexnumber === 1
              ? `app__bgg__image previous--image${indexnumber - 1}`
              : `app__bgg__image current--image${indexnumber - 1}`
          }
        >
          <img src={images.header_img1} alt="" />
        </div>

        <div
          // className="app__bgg__image next--image"
          className={
            indexnumber === 0
              ? `app__bgg__image current--image${indexnumber + 1}`
              : indexnumber === 1
              ? `app__bgg__image next--image${indexnumber + 1}`
              : `app__bgg__image previous--image${indexnumber - 2}`
          }
        >
          <img src={images.header_img2} alt="" />
        </div>

        <div
          className={
            indexnumber === 0
              ? `app__bgg__image previous--image${indexnumber}`
              : indexnumber === 1
              ? `app__bgg__image current--image${indexnumber}`
              : `app__bgg__image next--image${indexnumber}`
          }
        >
          <img src={images.header_img3} alt="" />
        </div>
      </div>
    </div>
  );
};

export default VoyageSlider;
