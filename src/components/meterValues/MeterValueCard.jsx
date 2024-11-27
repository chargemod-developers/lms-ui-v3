import React, { useContext, useEffect } from "react";
import pluginIcon from "../../assets/images/plugGun.svg";
import chargingIcon from "../../assets/images/lightning.svg";
import ExtradetailsIcon from "./ExtradetailsIcon";
import ccs2 from "../../assets/images/ccs2.svg";

const MeterValueCard = ({ data, gun = 1, handleStop, gunStatus }) => {
  console.log("gunStatus");
  console.log(gunStatus);

  return (
    <div className="flex gap-3  w-full h-[80%] items-center ">
      <div className="w-1 h-[80%] bg-whiteWith15Opacity"></div>
      <div className=" w-full rounded-3xl px-5 py-3 bg-bgBlue h-full flex flex-col justify-between gap-4">
        <div className="flex  h-full">
          {gunStatus?.status === "Charging" && <div className="w-2/3">
            <h1 className="text-center font-manrope text-base font-bold text-white mb-2">
              Gun 0{gun}
            </h1>
            <div className="">
              <div className="rounded-2xl  flex bg-cardBg text-white p-2 py-3 relative">
                <ExtradetailsIcon />
                <div className="w-1/2 flex flex-col items-center justify-center gap-1">
                  <img src={ccs2} alt="" width="40px" />
                  <div className=" text-xs font-manrope font-bold ">
                    <h1 className="">Connector Id</h1>
                    <h3 className="text-center">SADHBCB38</h3>
                  </div>
                </div>
                <div className="w-1/2 text-xs flex flex-col gap-2 font-bold font-manrope">
                  <div>
                    <h3 className="text-whiteWith50Opacity">Tariff</h3>
                    <h3>$ 12.8/kWh</h3>
                  </div>
                  <div>
                    <h3 className="text-whiteWith50Opacity">Energy</h3>
                    <h3>
                      {data[gun]?.energyDifference
                        ? parseFloat(data[gun]?.energyDifference).toFixed(2)
                        : "000"}{" "}
                      kWh{" "}
                    </h3>
                  </div>
                  <div>
                    <h3 className="text-whiteWith50Opacity">Used Amount</h3>
                    <h3>
                      {data[gun]?.energyDifference ? (
                        (
                          (parseFloat(data[gun]?.energyDifference) / 1000) *
                          12.8
                        ).toFixed(2)
                      ) : (
                        <h3>000</h3>
                      )}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl  bg-cardBg flex gap-2 font-bold font-manrope text-xs p-2 justify-evenly text-white">
                <div className="flex flex-col gap-1 items-center">
                  <h3 className="text-whiteWith50Opacity">Voltage</h3>
                  <h3>
                    {data[gun] ? (
                      <h3> {parseFloat(data[gun]?.voltage)?.toFixed(2)} V </h3>
                    ) : (
                      <h3>000</h3>
                    )}
                  </h3>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <h3 className="text-whiteWith50Opacity">Current</h3>
                  <h3>2.0 A</h3>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <h3 className="text-whiteWith50Opacity">Power</h3>
                  <h3>2.0 W</h3>
                </div>
              </div>
            </div>
          </div>}
          {gunStatus?.status === "Charging" ? (
            <div
              className={`w-1/3  flex flex-col ${
                data[gun]?.soc ? "justify-center" : "justify-end"
              }  items-center gap-3 text-white font-manrope mb-2`}
            >
              <img src={chargingIcon} alt="" />
              <h3 className="text-xs text-center">Your EV is Charging</h3>
              {data[gun]?.soc !== "N/A" ? (
                <p className="text-6xl font-bold">
                  {data[gun]?.soc ? data[gun]?.soc : ""}
                </p>
              ) : null}
            </div>
          ) : (
            <div
              className={`w-1/3  flex flex-col justify-end items-center gap-3 text-white font-manrope mb-1`}
            >
              <img src={pluginIcon} alt="" />
              <h3 className="text-xl text-start font-bold">
                Plug In <br />
                To Charge
              </h3>
            </div>
          )}
        </div>
       {gunStatus?.status === "Charging" && <div
          className="rounded-full font-manrope flex items-center justify-center bg-cardBg text-bgRed"
          onClick={handleStop}
        >
          <h3 className="py-2 font-bold">Stop Charging</h3>
        </div>}
      </div>
    </div>
  );
};

export default MeterValueCard;
