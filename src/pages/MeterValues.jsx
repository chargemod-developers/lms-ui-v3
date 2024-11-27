import React from "react";
import HeaderWithClock from "../components/general/header/HeaderWithClock";
import GunCard from "../components/meterValues/GunCard";
import MeterValueCard from "../components/meterValues/MeterValueCard";
import { se } from "date-fns/locale";

const MeterValues = () => {
  const [selectedGun, setSelectedGun] = React.useState(2);

  const handleGunSelection = () => {
    setSelectedGun(selectedGun === 1 ? 2 : 1);
  };
  return (
    <div className=" h-full w-full relative">
      <HeaderWithClock />
      <div className="flex  h-[80vh] ">
        <div className="w-[65%]  h-full flex items-center">
          <MeterValueCard />
        </div>
        <div className="w-[30%]  flex flex-col justify-center gap-2 font-manrope ml-5">
          <h3 className="text-center text-xl text-white">Switch Guns</h3>
          <div className="flex flex-col w-full gap-4">
            <div className="" onClick={handleGunSelection}>
              <GunCard
                selected={selectedGun === 1 ? true : false}
                status="Charging"
                gun={1}
              />
            </div>
            <div onClick={handleGunSelection}>
              <GunCard
                selected={selectedGun === 2 ? true : false}
                status="Available"
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
