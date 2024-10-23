import React, { useMemo } from "react";

const SeperatedInput = React.memo(({ value = [], length }) => {
  // Derive input directly from props using useMemo for performance optimization
  const input = useMemo(() => {
    const updatedInput = new Array(length).fill("0");
    if (Array.isArray(value)) {
      value.slice(0, length).forEach((item, index) => {
        const parsedItem = parseInt(item, 10);
        updatedInput[index] = isNaN(parsedItem) ? "0" : parsedItem;
      });
    }
    return updatedInput;
  }, [value, length]);

  // Memoize the input elements to prevent unnecessary re-renders
  const inputElements = useMemo(() => {
    return input.map((item, index) => (
      <div
        className={`border-2 w-fit py-1 px-3 font-bold rounded-lg text-xl ${
          item === "0"
            ? "text-whiteWith15Opacity border-whiteWith15Opacity"
            : "text-white border-bgBlue"
        }`}
        key={index}
      >
        {item}
      </div>
    ));
  }, [input]);

  return <div className="grid grid-cols-5 gap-y-2">{inputElements}</div>;
});

export default SeperatedInput;
