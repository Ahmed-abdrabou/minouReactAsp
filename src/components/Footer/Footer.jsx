import React from "react";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { ContactUs } from "../contactUs/contactUs";
import "./Footer.css";

const Footer = () => (
  <div className="app__footer " id="login">
    <div className="app__footer-links">
      <div className="app__footer-links_contact">
        <h1 className="app__footer-headtext">Contact Us</h1>
        <p className="p__opensans">E-mail : aaaaaaa@aaaa.com</p>
        <p className="p__opensans">WhatsApp: 0100000000</p>
        <div className="app__footer-links_icons">
          <FiFacebook
            onClick={() => {
              // window.location = "https://www.instagram.com/minoupastryshop/";
              // window.open("https://www.instagram.com/minoupastryshop/", "_blank");
              window.open(
                "https://www.facebook.com/profile.php?id=100067884432481",
                "_blank"
              );
            }}
            style={{ color: "#ffd897", fontSize: "40px" }}
            className="footerIcons"
          />
          <FiInstagram
            onClick={() => {
              // window.location = "https://www.instagram.com/minoupastryshop/";
              // window.open("https://www.instagram.com/minoupastryshop/", "_blank");
              window.open(
                "https://www.instagram.com/minoupastryshop/",
                "_blank"
              );
            }}
            style={{ color: "#ffd897", fontSize: "40px" }}
            className="footerIcons"
          />
        </div>
      </div>
      <ContactUs />
      <div className="app__footer-links_logo">
        <h2>Minou pastry shop</h2>
        <p className="p__opensans">
          &quot;The best way to find yourself is to lose yourself in the service
          of others.&quot;
        </p>
      </div>
    </div>

    <div className="footer__copyright">
      &copy; 2023 <span> Minou pastry shop </span>All Rights reserved.
    </div>
  </div>
);

export default Footer;
