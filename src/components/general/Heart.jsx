import React from "react";
import heartIcon from "../../assets/images/cardiology.png";

const Heart = () => {
  return (
    <div className="absolute  bottom-0 right-0 flex gap-5">
      <div className="text-white flex items-center gap-1">
        <img src={heartIcon} alt="" />
        <sub>1</sub>
      </div>
      <div className="text-white flex items-center gap-1">
        <img src={heartIcon} alt="" />
        <sub>2</sub>
      </div>
    </div>
  );
};

export default Heart;
