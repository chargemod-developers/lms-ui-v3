import { RiSignalTowerLine } from "react-icons/ri";
import SmallCircularSpinner from "../general/smallCircularSpinner/SmallCircularSpinner";
import { MdOutlineDone } from "react-icons/md";
import { useContext, useState } from "react";
import { GlobalContext } from "../../globalState/GlobalProvider";

const CPUrl = () => {
  const { deviceStatus } = useContext(GlobalContext);

  return (
    <div className="w-full rounded-full  py-1 bg-white flex items-center justify-between px-3 h-full">
      <RiSignalTowerLine color="#007AFF" />
      <p className="px-5">ws://192.168.29.43:8080/smartconnect/01/susanna</p>
      {deviceStatus ? (
        <div className="bg-green rounded-full ">
          <MdOutlineDone size={16} color="white" />
        </div>
      ) : (
        <SmallCircularSpinner />
      )}
    </div>
  );
};

export default CPUrl;
