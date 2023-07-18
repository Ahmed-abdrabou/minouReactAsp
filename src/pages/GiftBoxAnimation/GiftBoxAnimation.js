import React, { useState, useEffect, useReducer } from "react";
import "./styles.css";

import box from "./images/box.png";
import boxLid from "./images/box-lid.png";
import kuku from "./images/jump-character.png";
// import ConfettiGenerator from "./CanvasConfetti";
import Confetti from "./confetti/Confetti";

import { AudioFiles } from "../../constants";
const init_state = {
  move: "move",
  jump: "",
  rotated: "",
  rotating: "",
};
export default function GiftBoxAnimation() {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [toggleGiftBoxAnimation, setToggleGiftBoxAnimation] =
    React.useState(true);

  const [state, setState] = useReducer(
    (state, new_state) => ({
      ...state,
      ...new_state,
    }),
    init_state
  );

  const { move, rotating, rotated, jump } = state;

  function animate() {
    let isDone = rotated === "rotated" ? true : false;
    if (toggleMenu === false) {
      setToggleMenu(true);
    } else {
      setToggleMenu(false);
    }

    if (!isDone) {
      setState({ rotating: "rotating" });
      setTimeout(() => {
        setState({ jump: "jump" });
      }, 300);
      setTimeout(() => {
        setState({ rotated: "rotated" });
      }, 1000);
    } else {
      setState(init_state);
    }
    let moving = move === "move" ? "" : "move";
    setState({ move: moving });
  }

  return (
    <div className="App_GiftBoxAnimation_section">
      {toggleGiftBoxAnimation === true ? (
        <div className="App_GiftBoxAnimation_container">
          <div className="App_GiftBoxAnimation">
            <Confetti open={jump === "jump"} />
            <div className="img-container">
              <img className={`kuku ${jump}`} src={kuku} alt="kuku" />
              <button className="box" onClick={() => animate()}>
                <img src={box} alt="box" />
              </button>
              <img
                className={`lid ${move} ${rotating} ${rotated}`}
                src={boxLid}
                alt="box-lid"
              />
            </div>
          </div>
          {toggleMenu && (
            <div className="bobup">
              <div className="bobuptext1">
                Happy Birthday ya
                <span
                  style={{ color: "var(--pink-color)", fontWeight: "bold" }}
                >
                  {" "}
                  Mona🎂
                </span>
              </div>
              <div className="bobuptext2">
                😊 سمي الله وادخلى برجلك اليمين .. قصدى دوسي بإيدك اليمين
              </div>
              <span
                className="custom__button"
                onClick={() => {
                  setToggleGiftBoxAnimation(false);
                }}
              >
                دوسي هنا
              </span>
              <audio src={AudioFiles.birthday_ai} autoPlay></audio>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="countnumber">
            <ul>
              <li>Ready</li>
              <li>3</li>
              <li>2</li>
              <li>1</li>
              <li>Welcom To Minou's Website</li>
            </ul>
          </div>
          <audio src={AudioFiles.happy} autoPlay loop controls></audio>
        </div>
      )}
    </div>
  );
}
