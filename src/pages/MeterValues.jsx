import React, { useContext, useEffect, useState } from "react";
import HeaderWithClock from "../components/general/header/HeaderWithClock";
import GunCard from "../components/meterValues/GunCard";
import MeterValueCard from "../components/meterValues/MeterValueCard";
import { se } from "date-fns/locale";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../config/config";
import { GlobalContext } from "../globalState/GlobalProvider";

const { serverUrl } = config;

const MeterValues = () => {
  const { connectorId } = useParams();
  const { meterValues, gunData } = useContext(GlobalContext);

  console.log("Gun Data");
  console.log(gunData);

  const [selectedGun, setSelectedGun] = useState(1);
  const [gunStatus, setGunStatus] = useState(gunData);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [initialTime, setInitialTime] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [values, setValues] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (gunData && gunData[connectorId].status !== "Charging") {
      handleStop();
    }
  }, [gunData]);

  const fetchMeterValues = (gun) => {
    console.log("gun");
    console.log(gun);
    axios
      .post(
        `${serverUrl}/meter-value`,
        { key: gun },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => { 
  //   setGunStatus(gunData);
  // }, [gunData]);


  useEffect(() => {
    console.log("connectorId");
    console.log(connectorId);
    console.log("meterValues of " + connectorId);
    console.log(meterValues[connectorId]);
    setInitialTime(Date.now());
    setValues(meterValues[connectorId]);
    setSelectedGun(parseInt(connectorId));
    setTrigger(trigger + 1);
  }, []);

  const handleGunSelection = (gun) => {
    console.log("clicked");
    setSelectedGun(selectedGun === 1 ? 2 : 1);
    fetchMeterValues(gun);
  };

  const handleMoreDetails = () => {
    console.log("clicked");
    setIsPopupOpen(true);
  };

  const handleStop = async () => {
    console.log("stop charging");
    const stopStatus = await axios.post(`${serverUrl}/stop`, {
      connectorId,
    });
    if (stopStatus.status !== 200) {
      console.log("Error in stopping charging");
      return;
    }
    const finalTime = Date.now();
    const timeDiff = (finalTime - initialTime) / (1000 * 60);
    const totalCunsumed = Math.abs(parseFloat(values?.energyDifference) / 1000);
    const amount = totalCunsumed * 17;
    // navigate(`/pay/${timeDiff}/${totalCunsumed}/${amount}`); 
    navigate(`/pay/${timeDiff}/3/3`);
  };

  return (
    <div className=" h-full w-full relative">
      <HeaderWithClock />
      <div className="flex  h-[80vh] ">
        <div className="w-[65%]  h-full flex items-center">
          <MeterValueCard
            gun={selectedGun}
            data={meterValues}
            handleStop={handleStop}
            gunStatus={gunStatus[selectedGun]}
          />
        </div>
        <div className="w-[30%]  flex flex-col justify-center gap-2 font-manrope ml-5">
          <h3 className="text-center text-xl text-white">Switch Guns</h3>
          <div className="flex flex-col w-full gap-4">
            <div className="" onClick={()=>handleGunSelection(1)}>
              <GunCard
                selected={selectedGun === 1 ? true : false}
                status={gunStatus[1]?.status}
                gun={1}
              />
            </div>
            <div onClick={()=>handleGunSelection(2)}>
              <GunCard
                selected={selectedGun === 2 ? true : false}
                status={gunStatus[2]?.status}
                gun={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeterValues;
