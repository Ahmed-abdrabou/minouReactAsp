import React from "react";
import "./AboutMe.css";
import { images } from "../../constants";
const AboutMe = () => {
  return (
    <div className="section__padding section_container Small_flex_column_reverse AboutMe  reveal">
      <div className="AboutMe_img_container">
        <div className="AboutMe_img">
          <img src={images.mona_1} alt="AboutMe_img" />
        </div>
      </div>
      <div className="section_Text_container">
        <h2>Mona Osman</h2>
        <h3>Co-Founder and Head chef of Minou</h3>
        <p>
          We offer specially designed cakes for those of you looking for more
          than an ordinary cake. Whether you are throwing a surprise party,
          celebrating a birthday, engagement or getting married, we are sure to
          create a beautiful and unique cake for your special occasion.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
