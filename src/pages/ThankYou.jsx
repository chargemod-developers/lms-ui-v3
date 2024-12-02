import React, { useEffect } from "react";
import HeaderWithClock from "../components/general/header/HeaderWithClock";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => {
      // Re-enable scrolling
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="w-full h-full ">
      <HeaderWithClock />
      <div className="flex flex-col text-white justify-center items-center h-full font-manrope gap-5">
        <h1 className="text-2xl font-semibold">Thank You</h1>
        <h1 className="font-bold">HOME</h1>
      </div>
    </div>
  );
};

export default ThankYou;
