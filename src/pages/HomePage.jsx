import React from "react";
import HeaderWithClock from "../components/general/header/HeaderWithClock";
import heartIcon from "../assets/images/cardiology.png";
import particleIcon from "../assets/images/transparentParticle.gif";
import MessageBox from "../components/general/MessageBox";

const HomePage = () => {
  return (
    <div className=" h-full w-full relative">
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

      <HeaderWithClock />
      <div className=" w-full flex h-[80vh] ">
        <div className="w-2/3 flex items-center  ">
          <MessageBox text=" . It's a beautiful day today! Plug in and let me take care of the rest !" isContainerHalf={true}/>
        </div>
        <div className="w-1/3  flex items-center justify-center">
          <img src={particleIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
