import React from "react";
import "./circularLoader.style.css"; // Import the CSS file

const CircularLoader = () => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default CircularLoader;
