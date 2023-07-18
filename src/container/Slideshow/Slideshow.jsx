import React, { useState, useEffect, useRef, useMemo } from "react";
import { SlideshowImages } from "../../constants/SlideshowImages";

import "./Slideshow.css";

const delay = 4500;

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const timeoutRef = useRef(null);

  useEffect(() => {
    const resetTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === SlideshowImages.length - 3 ||
          prevIndex > SlideshowImages.length - 3
            ? 0
            : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  const memoizedImages = useMemo(() => SlideshowImages, []);

  const handleNextSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === SlideshowImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? SlideshowImages.length - 1 : prevIndex - 1
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
    <div className="app__content slideshow_section ">
      <div className="slideshow_section_header">
        <h1>BestSeller</h1>
      </div>
      <div
        className=" slideshow"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {memoizedImages.map((card, cardIndex) => (
            <div className="slide" key={card.id}>
              <img
                src={card.image}
                alt={`Slideshow ${cardIndex}`}
                className="slideshow_image"
                data-testid={`slideshow-image-${cardIndex}`}
              />
              <h3 className="slideshow_image_Title">{card.title}</h3>
              <p className="slideshow_image_Price">{card.price} LE</p>
            </div>
          ))}
        </div>
        <div className="slideshowDots">
          {memoizedImages.map((_, dotIndex) => (
            <div
              key={dotIndex}
              className={`slideshowDot${index === dotIndex ? " active" : ""}`}
              onClick={() => {
                setIndex(dotIndex);
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
