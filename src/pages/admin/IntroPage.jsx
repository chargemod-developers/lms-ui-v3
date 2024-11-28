import React, { useState } from "react";
import HeaderWithClock from "../../components/general/header/HeaderWithClock";
import { TiArrowRight } from "react-icons/ti";
import MessageBox from "../../components/general/MessageBox";
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const [visibleMessages, setVisibleMessages] = useState([0]);
  const [showNext, setShowNext] = useState(false);
  const navigate = useNavigate();

  const messages = [
    {
      text: " .Hi there! I'm Susanna, your friendly and intelligent chargepoint manager from ChargeMOD",
      width: 80,
    },
    {
      text: " .I'm here to help make everyones EV charging experience smooth and hassle-free. Feel free to reach out anytime - I'm always ready to assist every EV and its drivers!",
      width: 95,
    },
  ];

  const handleTypingComplete = (index) => {
    console.log("Typing complete", index);
    if (index < messages.length - 1) {
      setVisibleMessages((prev) => [...prev, index + 1]); // Add the next message to be visible
    } else {
      setShowNext(true); // Show the next button when all messages are visible
    }
  };

  const handleNext = () => {
    // Navigate to the next page
    console.log("Next");
    navigate("/admin/access");

  }
  console.log(visibleMessages);
  

  return (
    <div className="w-full h-full flex flex-col">
      <HeaderWithClock />
      <div className="h-[80%] pr-5 py-4 overflow-auto flex flex-col gap-y-2" >
        {visibleMessages.map((index) => (
          <MessageBox
            key={index}
            text={messages[index].text}
            width={messages[index].width}
            updateComplete={() => handleTypingComplete(index)} // Trigger when typing completes
          />
        ))}
      </div>
      <div className="flex justify-end">
        <div
          className={`flex h-full items-center text-white font-manrope px-4 py-2 rounded-full ${
            showNext ? "bg-bgBlue cursor-pointer" : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={showNext ? handleNext : null}
        >
          <h1>Continue to setup access code</h1>
          <TiArrowRight size={28} />
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
