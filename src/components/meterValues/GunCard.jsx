import React from "react";

const GunCard = ({ selected, status, gun }) => {
  return (
    <div className="flex gap-2 w-full font-manrope">
      <div
        className={`w-1 h-10 bg-whiteWith15Opacity rounded-full self-center ${
          selected ? "opacity-100" : "opacity-0"
        }`}
      ></div>
      <div
        className={`flex flex-col justify-center items-center rounded-2xl py-4 w-full text-white ${
          selected ? "bg-bgBlue" : "bg-cardBg"
        }`}
      >
        <h1 className="font-bold">Gun {gun}</h1>
        <h1 className={`${selected ? " ": "text-green"} text-sm font-semibold `}>{status}</h1>
      </div>
    </div>
  );
};

export default GunCard;
