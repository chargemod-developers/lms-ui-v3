import React, { useContext, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdDisplaySettings } from "react-icons/md";
import { TbReload } from "react-icons/tb";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { GlobalContext } from "../../../globalState/GlobalProvider";

const HeaderWithClock = () => {
  const [time, setTime] = useState(new Date());

  const { wifiStatus, ws, deviceStatus } = useContext(GlobalContext);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDateInIST = () => {
    return format(time, "hh:mm:ss a    EEE dd MMM, yyyy", { locale: enUS });
  };

  return (
    <div className="flex flex-col relative">
      {/* #################################################### */}
      <div className="absolute flex justify-center w-full gap-4 ">
        <div className="flex items-center gap-2 text-white">
          <div
            className={`w-4 h-4 ${wifiStatus ? "bg-green" : "bg-red-700"}`}
          ></div>
          <h2>WIFI</h2>
        </div>
        <div className="flex items-center gap-2 text-white">
          <div className={`w-4 h-4 ${ws ? "bg-green" : "bg-red-700"}`}></div>
          <h2>Socket Status</h2>
        </div>
        <div className="flex items-center gap-2 text-white">
          <div
            className={`w-4 h-4 ${deviceStatus ? "bg-green" : "bg-red-700"}`}
          ></div>
          <h2>Device Status</h2>
        </div>
      </div>
      {/* #################################################### */}

      <div className="flex justify-between">
        <h1 className="font-normal text-6xl text-white font-dongle self-end leading-[0.8]">
          susanna.<span className="font-light">ai</span>
        </h1>
        <div className="flex gap-6 items-center ">
          <h3 className="text-whiteWith50Opacity text-base font-manrope">
            {formatDateInIST()}
          </h3>
          <IoPersonCircleOutline size={24} color="white" />
          <MdDisplaySettings size={24} color="#656565" />
          <TbReload size={24} color="#656565" />
        </div>
      </div>
      <div className="h-1 w-full bg-bgBlue"></div>
    </div>
  );
};

export default HeaderWithClock;
