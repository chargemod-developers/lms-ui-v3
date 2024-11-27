import React, { useContext, useState } from "react";
import HeaderWithClock from "../../components/general/header/HeaderWithClock";
import WifiStatus from "../../components/wifi-check/WifiStatus";
import MessageBox from "../../components/general/MessageBox";
import { GlobalContext } from "../../globalState/GlobalProvider";

const WifiCheckPage = () => {
  const [isTypingComplete, setTypingComplete] = useState(true);
  const { wifiStatus } = useContext(GlobalContext);

  const refreshWifi = () => {
    console.log("Refreshing wifi");
  };

  return (
    <div
      className={`w-full h-full flex flex-col ${
        isTypingComplete ? "justify-between " : ""
      }`}
    >
      <HeaderWithClock />
      <div className={isTypingComplete ? "" : "mt-10"}>
        {wifiStatus ? (
          <MessageBox
            text=" . I got the WIFI connection and I have set up smart connect environment for chargepoint so i can handle both 1.6J and 2.0.1 OCPP connections"
            width={80}
            key={0}
            updateComplete={() => setTypingComplete(true)}
          />
        ) : (
          <MessageBox
            text=" . I cannot find a WIFI network. Would you please connect to the same wifi of the chargepoint?"
            width={80}
            type="error"
            key={1}
            updateComplete={() => setTypingComplete(true)}
          />
        )}
      </div>
      {isTypingComplete && (
        <div className=" flex justify-center">
          <div className="w-[80%] ">
            <WifiStatus />
          </div>
        </div>
      )}
    </div>
  );
};

export default WifiCheckPage;
