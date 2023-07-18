import React from "react";

import { FloatingWhatsApp } from "react-floating-whatsapp";

import {
  // MainDiscountBar,
  Header,
  // SessonSlides,
  // BestSeller,
  // SpecialOrderCakes,
  SpecialOccasionCakes,
  BirthdayCakes,
  WeddingCakes,
  MiniCakes,
  Reviews,
  VoyageSlider,
  AboutMe,
} from "../../container";
import { images } from "../../constants";
// import ShoppingCart from "../container/ShoppingCart/ShoppingCart";
import Slideshow from "../../container/Slideshow/Slideshow";
import MinouBox from "../MinouBox/MinouBox";
import "./MainPage.css";

const MainPage = () => (
  <div className="app__container">
    {/* <ShoppingCart /> */}
    <FloatingWhatsApp
      phoneNumber="+201000155355"
      showPopuo
      popupMessage="Hello, I am a floating whatsapp"
      headerTiltle="Hello, I am a floating whatsapp"
      message="Hello, I am a floating whatsapp"
      position="right"
      accountName="Minou pastry shop"
      allowEsc
      allowClickAway
      notification
      notificationSound
      avatar={images.whatsappAvater}
      chatMessage="Hi sweety, what do like to order"
      placeholder="type and press send to open whatsApp"
    />
    <Header />
    <AboutMe />
    <Slideshow />
    <BirthdayCakes />
    <WeddingCakes />
    <MiniCakes />
    <Reviews />
    {/* <VoyageSlider /> */}
    <SpecialOccasionCakes />
    <MinouBox />
  </div>
);

export default MainPage;
