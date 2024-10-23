import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdDisplaySettings } from "react-icons/md";
import { TbReload } from "react-icons/tb";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";

const HeaderWithClock = () => {
  const [time, setTime] = React.useState(new Date());

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
    <div className="flex flex-col">
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
