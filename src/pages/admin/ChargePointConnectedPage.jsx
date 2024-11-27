import React from "react";
import HeaderWithClock from "../../components/general/header/HeaderWithClock";
import CPUrl from "../../components/general/CPUrl";
import cpIcon from "../../assets/images/ev_charger.png";
import powerIcon from "../../assets/images/power.png";
import heartIcon from "../../assets/images/cardiology.png";
import { useNavigate } from "react-router-dom";

const ChargePointConnectedPage = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => () => {
    navigate(path);
  };

  return (
    <div className="w-full h-full flex flex-col" onClick={navigateTo("/")}>
      <HeaderWithClock />
      <div className=" w-full mt-10 flex flex-col items-center justify-center gap-6 font-manrope">
        <h1 className="text-xl text-white">Chargepoint Connected !</h1>
        <div className="w-[80%] h-10">
          <CPUrl />
        </div>
        <div className="bg-cardBg w-[90%] rounded-3xl">
          <div className="flex justify-between py-5 text-white w-[90%] mx-auto">
            <div className="flex items-center gap-3">
              <img src={cpIcon} alt="chargepoint" />
              <div className="flex flex-col ">
                <h3>Vendor Name</h3>
                <h3>Model Name</h3>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex gap-2">
                <img src={powerIcon} alt="" />
                <p>1</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={heartIcon} alt="" />
                <p>60 Sec</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center w-[85%] text-whiteWith50Opacity leading-5">
          Susanna have successfully connected via OCPP 1.6J with smart connect
          features including advanced chargepoint controls, Intelligent meter
          reading validations, Intelligent trouble shooting and many more.
        </p>
      </div>
    </div>
  );
};

export default ChargePointConnectedPage;
