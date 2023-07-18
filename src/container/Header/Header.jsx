import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "./Header.css";

// import BackGroundSlider from "../BackGroundSlider/BackGroundSlider";
// import { BackGround_images } from "../../constants/BackGround_images";
import VideoSection from "../VideoSection/VideoSection";
// import Surprise from "../../pages/Surprise/Surprise";
// import GiftBoxAnimation from "../../pages/GiftBoxAnimation/GiftBoxAnimation";

const Header = () => {
  const navigate = useNavigate();
  const presshandleer = () => {
    navigate("/OrderNow");
    window.scrollTo(0, 0);
  };

  // function header_h2_animation() {
  //   var reveals = document.querySelectorAll(".header_h2_animation");
  //   for (var i = 0; i < reveals.length; i++) {
  //     var windowHeight = window.innerHeight;
  //     var elementTop = reveals[i].getBoundingClientRect().top;
  //     var elementVisible = 150;
  //     if (elementTop < windowHeight - elementVisible) {
  //       reveals[i].classList.add("active");
  //     } else {
  //       reveals[i].classList.remove("active");
  //     }
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", header_h2_animation);
  //   return () => window.removeEventListener("scroll", header_h2_animation);
  // }, []);

  return (
    <div className="app__content app__header header" id="Header">
      {/* <Surprise /> */}
      {/* <GiftBoxAnimation /> */}

      <div className="app__header-text">
        <h2 className="header_h2_animation">Cake Your Day;</h2>
        <p className="header_p_animation">
          " For our desserts we always use only the natural ingredients, Our
          production is 100% handmade "
        </p>
        <p className="header_p_animation">Made For You With Love...&hearts;</p>

        <span
          className="custom__button header-foot_button"
          onClick={presshandleer}
        >
          Order Now..
        </span>
      </div>

      {/* <BackGroundSlider slides={BackGround_images} /> */}
      <VideoSection />
      <div className="header-foot">
        <span className="header-foot-bg"></span>
      </div>
    </div>
  );
};

export default Header;
