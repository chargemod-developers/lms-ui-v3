import React, { useState } from "react";
import Heart from "../components/general/Heart";
import HeaderWithClock from "../components/general/header/HeaderWithClock";
import MessageBox from "../components/general/MessageBox";

const messages = [
  {
    text: " .There seems to be an issue with your charging session!",
    width: 70,
    type: "error",
  },
  {
    text: " .Please unplug your charging cable, wait 30 seconds, and then reconnect it.",
    width: 60,
  },
];

const SomethingWrong = () => {
  const [visibleMessages, setVisibleMessages] = useState([0]);
  const [showNext, setShowNext] = useState(false);
  const handleTypingComplete = (index) => {
    console.log("Typing complete", index);
    if (index < messages.length - 1) {
      setVisibleMessages((prev) => [...prev, index + 1]); // Add the next message to be visible
    } else {
      setShowNext(true); // Show the next button when all messages are visible
    }
  };
  return (
    <div className=" h-full w-full relative">
      <Heart />
      <HeaderWithClock />
      <div className=" h-[80vh] flex flex-col justify-center gap-5">
        <div></div>
        <div className="flex flex-col gap-3">
          {visibleMessages.map((index) => (
            <MessageBox
              key={index}
              text={messages[index].text}
              width={messages[index].width}
              type={messages[index].type}
              updateComplete={() => handleTypingComplete(index)} // Trigger when typing completes
            />
          ))}
        </div>
        <div>
          <h3
            className={`text-white text-xl font-manrope ml-10 ${
              showNext ? "opacity-100" : "opacity-0"
            } custome-in`}
          >
            If the problem persists, please contact <br />
            our customer support at <b>+91 9876 5432 10</b>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SomethingWrong;
