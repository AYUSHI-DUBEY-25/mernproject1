import React from "react";
import "./App.css";

const BackgroundVideo = () => {
  return (
    <div className="video-container">
      <video autoPlay loop muted className="background-video">
        <source src={require("./assets/background.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Your Website Content Here</h1>
      </div>
    </div>
  );
};

export default BackgroundVideo;
