import React from "react";

import Videos from "../../constants/videos";
import "./VideoSection.css";

const VideoSection = () => {
  return (
    <div className="app__content VideoSection">
      <div className="videobg">
        {/* <div className="videomain"> */}
        <video
          src={Videos.Video1}
          // width={"1000px"}
          // height={"800px"}
          autoPlay
          muted
          loop
        />
        {/* <video
          src={Videos.Video1}
          // width={"1000px"}
          // height={"800px"}
          autoPlay
          muted
          loop
        /> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default VideoSection;
