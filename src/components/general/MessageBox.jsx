import React, { useState, useEffect } from "react";
import useTypewriter from "../../hooks/useTypewriter";

const MessageBox = ({ text = "", width, updateComplete, type }) => {
    const [cachedWidth, setCachedWidth] = useState(width);

    useEffect(() => {
        setCachedWidth(width);
    }, [width]);

    const handleComplete = () => {
        updateComplete();
    };
    const typedText = useTypewriter(text, 50, handleComplete);

    return (
        <div className="">
            <div
                className="flex gap-2 items-center justify-start "
                >
                <div className="w-1 h-20 bg-whiteWith15Opacity rounded-full"></div>
                <div className={`p-8 rounded-3xl  text-white font-semibold font-manrope w-full ${type === "error" ? "bg-bgRed" : "bg-bgBlue"} `}
                style={{ width: cachedWidth ? `${cachedWidth}vw` : "100vw" }}
                >
                    <h1>{typedText}</h1>
                </div>
            </div>
        </div>
    );
};

export default MessageBox;
