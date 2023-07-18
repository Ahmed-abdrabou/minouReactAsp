import React from "react";

import "./Surprise.css";

const Surprise = () => {
  const [toggleMenu, setToggleMenu] = React.useState(true);

  return (
    <div>
      {toggleMenu && (
        <div className="Surprise_container">
          <div className="birthday-gift">
            <div className="gift">
              <input id="click" type="checkbox" />
              <label className="click" for="click"></label>
              <div className="wishes">
                <div className="wishestext1">
                  Happy Birthday
                  <span style={{ color: "var(--pink-color)" }}>Mona</span> 🐤
                </div>
                <div className="wishestext2">
                  😊 سمي الله وادخلى برجلك اليمين .. قصدى دوسي بإيدك اليمين
                </div>
                <span
                  className="custom__button"
                  onClick={() => setToggleMenu(false)}
                >
                  دوسي هنا بسرعه
                </span>
              </div>
              <div className="sparkles">
                <div className="spark1"></div>
                <div className="spark2"></div>
                <div className="spark3"></div>
                <div className="spark4"></div>
                <div className="spark5"></div>
                <div className="spark6"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Surprise;
