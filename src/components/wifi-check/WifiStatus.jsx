import React, { useContext, useState } from "react";
import { RiWifiOffFill } from "react-icons/ri";

import CPUrl from "../general/CPUrl";
import { GlobalContext } from "../../globalState/GlobalProvider";


const WifiStatus = ({ refresh }) => {
  const { wifiStatus } = useContext(GlobalContext);
  return (
    <>
      {wifiStatus ? (
        <div className="bg-cardBg rounded-2xl flex items-center justify-center py-2 ">
          <WifiConnected />
        </div>
      ) : (
        <div className="bg-cardBg rounded-2xl flex items-center justify-center py-2">
          <NotConnected refresh={refresh} />
        </div>
      )}
    </>
  );
};

export default WifiStatus;

const NotConnected = ({ refresh }) => {
  return (
    <div>
      <div className="flex flex-col items-center gap-5 text-white font-manrope py-2">
        <div className=" flex items-center gap-3">
          <RiWifiOffFill size={30} />
          <h1 className=" text-2xl">Wi-Fi Disconnected </h1>
        </div>
        <p className="w-3/5 text-center text-whiteWith50Opacity text-sm">
          Waiting for a wifi connection for Susanna to set up the smart connect
          environment !{" "}
        </p>
        <div
          className="text-base font-manrope font-bold  px-28 rounded-full py-3 bg-bgBlue"
          onClick={() => refresh()}
        >
          Refresh
        </div>
      </div>
    </div>
  );
};

const WifiConnected = () => {
  return (
    <div>
      <div className="flex flex-col items-center gap-3  font-manrope py-2 ">
        <h1 className="text-xl font-normal text-white">
          Waiting for incoming charge point connection
        </h1>
        <p className=" text-center text-whiteWith50Opacity text-sm">
          Please set up chargepoint with the connection endpoint
        </p>
        <div className="h-16 bg-bgBlue w-full rounded-3xl">
          <div className="h-1/2">
            <CPUrl />
          </div>
          <div className="flex gap-2 items-center justify-center mt-1 text-white font-manrope">
            <h3>Port : 8080</h3>
            <h3>Device ID : susanna</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
