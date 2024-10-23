import React, { useState } from "react";
import Header from "../../components/general/header/Header";
import { useNavigate } from "react-router-dom";
import { MdOutlineLockPerson } from "react-icons/md";
import { MdOutlineBackspace } from "react-icons/md";
import SeperatedInput from "../../components/general/SeperatedInput";

const ActivationPage = () => {
  const inputLength = 10;
  const [inputValue, setInputValue] = useState([]);

  const navigate = useNavigate();
  const handleSkip = () => {
    console.log("Skip");
    navigate("/admin/intro");
  };

  const handleNumberClicks = (e) => {
    const value = e.target.innerText;
    console.log(value);
    if (inputValue.length < inputLength && value !== "") {
      setInputValue([...inputValue, value]);
    }
  };
  const handleClear = () => {
    console.log("Clear");
    setInputValue((prev) => prev.slice(0, -1));
  };
  const handleVerify = () => {
    const code = inputValue.join("");
    console.log(code);
  };

  console.log(inputValue);
  return (
    <div className="w-full h-full flex flex-col justify-between ">
      <Header />
      <div className="h-full flex text-susannaWhite gap-10 justify-between mx-10   pt-8">
        <div className="w-2/5 mt-5 flex flex-col gap-8  justify-between">
          <SeperatedInput
            length={inputLength}
            value={inputValue}
            key={inputValue}
          />
          <div className="">
            <div className="flex gap-5 items-center ">
              <MdOutlineLockPerson size={30} color="white" />
              <h1 className="font-manrope font-bold text-2xl text-bgBlue">
                Activation Code
              </h1>
            </div>
            <h1 className="mt-2 font-manrope text-whiteWith50Opacity tracking-wider text-sm">
              Enter in the Susanna activation code which you have received while
              purchasing this product. Skip for running on Susanna lite.
            </h1>
          </div>
          <div
            className="flex text-base font-bold text-white justify-center items-center font-manrope   text-susannaWhite h-12 py-3 bg-whiteWith25Opacity  rounded-full "
            onClick={handleSkip}
          >
            Skip
          </div>
        </div>
        <div className="w-3/5 h-full  flex flex-col justify-between items-end ">
          <div className="grid grid-cols-3 h-[78%]  gap-y-0   w-[90%] mr-5">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"].map(
              (num) => (
                <div
                  key={num}
                  className="flex justify-end items-center text-white font-extrabold text-2xl transition-transform transform hover:scale-110 active:scale-90"
                  onClick={handleNumberClicks}
                >
                  {num}
                </div>
              )
            )}
            <div
              className="flex justify-end items-center font-extrabold text-2xl transition-transform transform hover:scale-110 active:scale-90"
              onClick={handleClear}
            >
              <MdOutlineBackspace color="white" />
            </div>
          </div>
          <div className="w-full  flex justify-end">
            <div
              className="flex items-end text-base font-bold text-white justify-center  font-manrope   text-susannaWhite h-12 py-3 bg-bgBlue  rounded-full w-[95%]"
              onClick={handleVerify}
            >
              Verify
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivationPage;
