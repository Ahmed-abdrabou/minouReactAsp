import React, { useState } from "react";
import "./Reviews.css";
import { ReviewsData } from "../../constants/ReviewsData";

const delay = 5500;

const Reviews = () => {
  const [index, setIndex] = React.useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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
        setIndex((prevIndex) =>
          prevIndex === ReviewsData.length - 1 ||
          prevIndex > ReviewsData.length - 1
            ? 0
            : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  const handleNextSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === ReviewsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? ReviewsData.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 15) {
      handleNextSlide();
    }

    if (touchStart - touchEnd < -15) {
      handlePrevSlide();
    }
  };

  return (
    <div className="app__content Reviews_section">
      <div className="Reviews_section_header">
        <h1>Minou's Friends Review</h1>
      </div>
      <div
        className="Reviews"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="ReviewsSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {ReviewsData.map((card, index) => (
            <div className="ReviewsSlide" key={index}>
              <img src={card.image} alt="ReviewsImage" />
            </div>
          ))}
        </div>
        <div className="ReviewsDots">
          {ReviewsData.map((_, idx) => (
            <div
              key={idx}
              className={`ReviewsDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
