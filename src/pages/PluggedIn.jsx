import React, { useContext, useEffect } from "react";
import HeaderWithClock from "../components/general/header/HeaderWithClock";
import MessageBox from "../components/general/MessageBox";
import particleIcon from "../assets/images/transparentParticle.gif";
import { useNavigate, useParams } from "react-router-dom";
import SmallCircularSpinner from "../components/general/smallCircularSpinner/SmallCircularSpinner";
import Heart from "../components/general/Heart";
import { GlobalContext } from "../globalState/GlobalProvider";

const PluggedIn = () => {
  const { connectorId } = useParams();
  const navigate = useNavigate();
  const { gunData, meterValues } = useContext(GlobalContext);
  const [typingComplete, setTypingComplete] = React.useState(false);
  const [isChargingWithApp, setIsChargingWithApp] = React.useState(false);

  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

  const [countdown, setCountdown] = React.useState(10);

  React.useEffect(() => {
    if (typingComplete && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [typingComplete, countdown]);

  const handleAbortAutoCharge = () => {
    setIsChargingWithApp(true);
  }

  useEffect(() => {
    if (gunData && gunData[connectorId].status === "Charging") {
        navigate(`/meter-values/${connectorId}`);
    }else if(gunData && gunData[connectorId].status === "Available"){
        navigate(`/`);
    }
  }, [gunData]);

  return (
    <div className=" h-full w-full relative">
      <Heart/>
      <HeaderWithClock />
      <div className=" w-full flex h-[80vh] ">
        <div className="w-2/3 flex flex-col items-center  justify-evenly gap">
          <div></div>
          <div>
            <MessageBox
              text={` . I got a message from Gun ${connectorId}  !`}
              isContainerHalf={true}
              updateComplete={handleTypingComplete}
            />
            {(!isChargingWithApp ) && (
              <div className="text-white font-manrope ml-4 mt-4 flex gap-2 ">
                Your EV will start charging in {countdown} seconds!
                <SmallCircularSpinner />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5  w-[90%] text-white mt-3 font-manrope">
            { (
              <div className="flex  gap-5 justify-between items-center -10">
                <div className=" py-3 px-5 rounded-full w-full flex justify-center bg-bgBlue font-bold">
                  Charge Now
                </div>
                <p>OR</p>
                <div className=" py-3 px-5 rounded-full w-full flex justify-center bg-white text-bgBlue font-bold" onClick={handleAbortAutoCharge}>
                  Charge using app
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3  flex items-center justify-center">
          <img src={particleIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PluggedIn;
