import { RiSignalTowerLine } from "react-icons/ri";
import SmallCircularSpinner from "../general/smallCircularSpinner/SmallCircularSpinner";
import { MdOutlineDone } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../globalState/GlobalProvider";
import config from "../../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { serverUrl } = config;

const CPUrl = () => {
  const [socketUrl, setSocketUrl] = useState();
  const { deviceStatus } = useContext(GlobalContext);


  useEffect(() => {
    axios
      .get(`${serverUrl}/get-ip`)
      .then((result) => {
        setSocketUrl(result.data);
      })
      .catch((err) => {
        console.log("error in getting socket url");
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full rounded-full  py-1 bg-white flex items-center justify-between px-3 h-full">
      <RiSignalTowerLine color="#007AFF" />
      <p className="px-5">{socketUrl}</p>
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
