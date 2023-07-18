import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import { signOut } from "firebase/auth";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";

import { ShopContext } from "../../container/context/shop-context";

import images from "../../constants/images";
import "./Navbar.css";

const Navbar = ({ user }) => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  const { getTotalCartNumbers } = useContext(ShopContext);
  const TotalCartNumbers = getTotalCartNumbers();

  const navigate = useNavigate();
  const presshandleer = () => {
    // navigate("/");
    window.scrollTo(0, 0);
  };

  const handleLogout = async () => {
    try {
      navigate("/minoupastryshop");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <nav className="app__content app__navbar">
      {/* MINOU-pastry-shop-text.png */}

      {isAdmin && (
        <div className="dashboardLink">
          <Link to="/Dashboard" onClick={presshandleer}>
            Dashboard
          </Link>
        </div>
      )}

      <Link to="/minoupastryshop" onClick={presshandleer}>
        <div className="app__navbar-logo-text">
          <div className="app__logo-title">
            <span>Minou</span>
            <span>Pastry Shop</span>
          </div>
        </div>
      </Link>
      <ul className="app__navbar-links">
        <li>
          <Link to="/minoupastryshop" onClick={presshandleer}>
            Home
          </Link>
        </li>

        {/* <li>
          <Link to="/carte" onClick={presshandleer}>
            carte
          </Link>
        </li> */}
        {/* <li>
          <Link to="/ProductsFromFireBase" onClick={presshandleer}>
            ProductsFromFireBase
          </Link>
        </li> */}
        {/* <li>
          <Link to="/AddProducts" onClick={presshandleer}>
            AddProducts
          </Link>
        </li> */}
        <li>
          <Link to="/OrderNow" onClick={presshandleer}>
            Order A Cake
          </Link>
        </li>
      </ul>
      <Link to="/minoupastryshop" onClick={presshandleer}>
        <div className="app__navbar-logo">
          <img src={images.logo2} alt="app__logo" />
        </div>
      </Link>
      <ul className="app__navbar-links">
        <li>
          <Link to="/MinouBox" onClick={presshandleer}>
            MinouBox
          </Link>
        </li>
        {/* <li>
          <Link to="/Cart" onClick={presshandleer}>
            Shopping Cart
          </Link>
        </li> */}
        {!user && (
          <>
            <li>
              <Link to="/LogInSignUP" onClick={presshandleer}>
                LogIn \ SignUP
              </Link>
            </li>
          </>
        )}

        {user && (
          <div className="NavbarUserNameContainer">
            <div
              className="NavBarUserName"
              style={{ textTransform: "capitalize", fontSize: "10px" }}
            >
              welcome: {user}
            </div>
            <div
              className="NavBarLogOut"
              style={{
                textTransform: "capitalize",
                fontSize: "10px",
                color: "red",
                cursor: "pointer",
                border: "3px sloid black",
              }}
              onClick={handleLogout}
            >
              LOGOUT
            </div>
          </div>
        )}
      </ul>
      <div className="app__navbar-cart">
        <Link to="/cart" onClick={presshandleer}>
          <img src={images.cart} alt="cart" />
        </Link>
        <div className="app__navbar-cart-count">
          <span>{TotalCartNumbers}</span>
        </div>
      </div>
      {/* burger menu */}
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu
          color="#000000"
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu
              fontSize={27}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="app__navbar-smallscreen_links">
              <li>
                <Link
                  to="/minoupastryshop"
                  onClick={() => {
                    setToggleMenu(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/OrderNow"
                  onClick={() => {
                    setToggleMenu(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Order A Cake
                </Link>
              </li>
              <li>
                <Link
                  to="/MinouBox"
                  onClick={() => {
                    setToggleMenu(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  MinouBox
                </Link>
              </li>
              <li>
                <Link
                  to="/Cookies"
                  onClick={() => {
                    setToggleMenu(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Cookies
                </Link>
              </li>
              <li>
                <Link
                  to="/Brownies"
                  onClick={() => {
                    setToggleMenu(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Brownies
                </Link>
              </li>
              <li>
                <Link
                  to="/Cupcakes"
                  onClick={() => {
                    setToggleMenu(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Cupcakes
                </Link>
              </li>
              <li>
                <Link
                  to="/Eclairs"
                  onClick={() => {
                    setToggleMenu(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Eclairs
                </Link>
              </li>

              <li>
                <Link
                  to="/Cart"
                  onClick={() => {
                    setToggleMenu(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
