import { useEffect, useState } from "react";
import CircularLoader from "../../components/general/circularLoader/CircularLoader";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
const BootPage = () => {
  const navigate = useNavigate();

  const { isAuthorized } = config;
  const [loadSecond, setLoadSecond] = useState(false);
  const [loadThird, setLoadThird] = useState(true);

  useEffect(() => {
    console.log("Boot Page");
    setTimeout(() => {
      setLoadSecond(true);
    }, 1000);
    setTimeout(() => {
      setLoadThird(false);
    }, 3000);
    setTimeout(() => {
      if (isAuthorized) {
        navigate("/");
      } else {
        navigate("/admin");
      }
    }, 5000);
  }, []);
  return (
    <div className=" w-screen h-screen  flex flex-col justify-between   items-center  bg-black p-7">
      <h1 className=" h-1/3"></h1>
      {!loadThird && (
        <h1 className=" h-1/3 font-normal font-dongle  text-white animate-fadeIn text-[5rem]">
          susanna.<span className="font-light">ai</span>
        </h1>
      )}
      <div className="flex  flex-col gap-4  h-1/3 justify-end">
        <div className="flex justify-center ">
          {loadSecond && loadThird && <CircularLoader />}
        </div>
        <h3 className="mb-10">
          <span className="text-white">Powered by</span>{" "}
          <span className="text-white">charge</span>
          <span className="text-modOrange font-extrabold ">MOD</span>
        </h3>
      </div>
    </div>
  );
};

export default BootPage;
