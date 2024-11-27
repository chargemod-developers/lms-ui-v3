import React from "react";
import Heart from "../components/general/Heart";
import HeaderWithClock from "../components/general/header/HeaderWithClock";
import MessageBox from "../components/general/MessageBox";

const previousChargingHistory = {
  "VIN Number": "TMBJC7NYOM0123456",
  Date: "20 June 2023",
  "Total(kWh)": "50",
  Connector: "CCS2",
  "Station Tariff": "10.63",
  Total: "531.50",
};

const PaymentPending = () => {
  return (
    <div className=" h-full w-full relative ">
      <Heart />
      <HeaderWithClock />
      <div className="mt-5 ">
        <MessageBox
          text=" .You have an unpaid balance from your last charging session. Please settle this amount to continue charging."
          width={80}
        />
        <div className="w-full flex  mt-3 gap-5     ">
          <div className="w-3/6  ml-3 text-white">
            <h1 className="ml-4 py-1 font-manrope">Charging History</h1>
            <div className="text-white font-manrope  bg-cardBg  rounded-3xl p-5 text-sm">
              <div className="flex justify-between">
                <h3>VIN Number</h3>
                <p>{previousChargingHistory["VIN Number"]}</p>
              </div>
              <div className="flex justify-between">
                <h3>Date</h3>
                <p>{previousChargingHistory["Date"]}</p>
              </div>
              <div className="flex justify-between">
                <h3>Total(kWh)</h3>
                <p>{`${previousChargingHistory["Total(kWh)"]} kWh`}</p>
              </div>
              <div className="flex justify-between">
                <h3>Connector</h3>
                <p>{previousChargingHistory["Connector"]}</p>
              </div>
              <div className="flex justify-between">
                <h3>Station Tariff</h3>
                <p>{`₹ ${previousChargingHistory["Station Tariff"]}`}</p>
              </div>
              <div className="h-[0.5px] my-2 w-full bg-white"></div>
              <div className="flex justify-between">
                <h3>Total</h3>
                <p>{`₹ ${previousChargingHistory["Total"]}`}</p>
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center w-2/6 mt-5 ">
            <button className="px-10 py-2 bg-bgBlue rounded-full font-semibold text-white ">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPending;
