import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import CryptoJS from "crypto-js";

import { useNavigate } from "react-router-dom";

import "./LogInSignUP.css";
const LogInSignUP = () => {
  const [signUpUser, setSignUpUser] = useState({
    id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [signInUser, setSignInUser] = useState({
    id: "",
    email: "",
    password: "",
  });
  const [fullName, setFullname] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [userId, setUserId] = useState(null); // New state for user ID

  const navigate = useNavigate();

  //--------------------------------------------------------------------------------------

  // const [sessionIdentifier, setSessionIdentifier] = useState("");

  // // Encrypt session identifier before storing in local storage
  // const encryptedSessionSet = CryptoJS.AES.encrypt(
  //   sessionIdentifier,
  //   "encryptionKey"
  // ).toString();

  // window.localStorage.setItem("sessionToken", encryptedSessionSet);
  // Set session identifier in session storage
  // window.sessionStorage.setItem("sessionToken", encryptedSessionSet);

  // // Decrypt session identifier when retrieving from local storage
  // const encryptedSessionGet = window.localStorage.getItem("sessionToken");
  // Retrieve session identifier from session storage
  // const sessionIdentifier = window.sessionStorage.getItem("sessionToken");

  // const decryptedSession = CryptoJS.AES.decrypt(
  //   encryptedSessionGet,
  //   "encryptionKey"
  // ).toString(CryptoJS.enc.Utf8);
  //--------------------------------------------------------------------------------------

  // ----------------------------------------------------------  to add new user to backend ----------------------------------
  const handleSignup = async (e) => {
    e.preventDefault();
    //-----------------------------------------------------------
    // Check if user and email inputs are empty
    if (!signUpUser.password || !signUpUser.email) {
      setErrorMsg("Please enter a password ,email for the user");
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
      return;
    }
    //-----------------------------------------------------------
    try {
      const response = await axios.post(
        "https://localhost:7005/api/Users",
        {
          // id: 0,
          userId: "0",
          firstName: signUpUser.firstName,
          lastName: signUpUser.lastName,
          password: signUpUser.password,
          email: signUpUser.email,
          // address: "",
          // phone: 0,
          // level: 0,
          // status: 0,
          // created_at: "",
        }
        // {
        //   headers: {
        //     Accept: "*/*",
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      setSignUpUser({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
      });
      console.log("response: " + response.data);
      setSuccessMsg("user registered succesfully");

      setTimeout(() => {
        setSuccessMsg("");
        handleSignInClick();
      }, 2000);
    } catch (err) {
      if (err.response.data.Email) {
        setErrorMsg(err.response.data.Email[0]);
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      } else {
        setErrorMsg("Failed to save the user. Please try again.");
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      }
      // setErrorMsg(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.get(
      //   `https://localhost:7005/api/Users/${signInUser.password},${signInUser.email}`
      // );
      const response = await axios.post(
        `https://localhost:7005/api/Users/login?password=${signInUser.password}&Email=${signInUser.email}`,
        {
          withCredentials: true, // Send cookies with the request
        }
      );
      // Check the response status
      if (response.status === 200) {
        // // Retrieve the user ID from the response
        // setUserId(response.data); // Set the user ID state

        // Login successful
        setSuccessMsg("Login successful.");
        setTimeout(() => {
          setSuccessMsg("");
        }, 2000);

        setSignInUser({
          password: "",
          email: "",
        });
        // Perform any additional actions or redirect to the desired page
      } else {
        // Handle other response statuses if needed
        setErrorMsg("Failed to login. Please try again......");
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      }
      console.log(response.data);

      // Store the user ID in localStorage and sessionStorage
      // localStorage.setItem("userId", response.data);
      // sessionStorage.setItem("userId", response.data);

      // Redirect to the home page or your desired route
      // navigate("/cart");
    } catch (error) {
      // Check if the error response status is 401 (Unauthorized)
      if (
        error.response ||
        error.response.status === 401 ||
        error.response.status === 404
      ) {
        //error message from server side
        setErrorMsg(error.response.data);
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      } else {
        setErrorMsg("Failed to login. Please try again.");
        setTimeout(() => {
          setErrorMsg("");
        }, 2000);
      }
    }
  };
  // ---------- start for css flip ------------
  const [panelActive, setPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setPanelActive(true);
  };

  const handleSignInClick = () => {
    setPanelActive(false);
  };
  // ----------end for css flip ------------

  return (
    <>
      <div
        className={`LogIn_container ${panelActive ? "right-panel-active" : ""}`}
      >
        {/*  */}
        {/*  */}
        {/*  */}
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form
              action="#signUpForm"
              autoComplete="off"
              onSubmit={handleSignup}
            >
              <h1>Create Account</h1>
              {successMsg && (
                <>
                  <div className="success-msg">{successMsg}</div>
                  <br></br>
                </>
              )}
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => {
                  setSignUpUser({ ...signUpUser, firstName: e.target.value });
                }}
                value={signUpUser.firstName}
                placeholder="First Name"
              ></input>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => {
                  setSignUpUser({ ...signUpUser, lastName: e.target.value });
                }}
                value={signUpUser.lastName}
                placeholder="Last Name"
              ></input>
              <input
                type="email"
                className="form-control"
                required
                value={signUpUser.email}
                onChange={(e) => {
                  setSignUpUser({ ...signUpUser, email: e.target.value });
                }}
                placeholder="Email"
              ></input>
              <input
                type="password"
                className="form-control"
                required
                value={signUpUser.password}
                onChange={(e) => {
                  setSignUpUser({ ...signUpUser, password: e.target.value });
                }}
                placeholder="Password"
              ></input>
              <button type="submit">Sign Up</button>
              {errorMsg && (
                <>
                  <div className="error-msg">{errorMsg}</div>
                </>
              )}
            </form>
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
          <div className="form-container sign-in-container">
            <form action="#signInForm" onSubmit={handleLogin}>
              <h1>Sign in</h1>
              {successMsg && (
                <>
                  <div className="success-msg">{successMsg}</div>
                  <br></br>
                </>
              )}
              <input
                type="email"
                className="form-control"
                onChange={(e) => {
                  setSignInUser({ ...signInUser, email: e.target.value });
                }}
                value={signInUser.email}
                placeholder="Email"
                required
              ></input>
              <input
                type="password"
                className="form-control"
                required
                onChange={(e) => {
                  setSignInUser({ ...signInUser, password: e.target.value });
                }}
                value={signInUser.password}
                placeholder="Password"
              ></input>
              <button type="submit">Sign In</button>
              {/* <a href="#ForgoYourPassword">Forgot your password?</a> */}
              {errorMsg && (
                <>
                  <div className="error-msg">{errorMsg}</div>
                </>
              )}
            </form>
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={handleSignInClick}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInSignUP;
