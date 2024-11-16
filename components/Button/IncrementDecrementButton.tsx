import React from "react";

interface IncrementDecrementButtonProps {
  quantity: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const IncrementDecrementButton = ({
  handleIncrement,
  handleDecrement,
  quantity,
}: IncrementDecrementButtonProps) => {
  return (
    <div className="flex items-center">
      <button
        className="bg-white text-gray-600 py-1 px-3 font-semibold rounded-l max-w-fit shadow-sm hover:shadow-md"
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="px-3">{quantity}</span>
      <button
        className="bg-white text-gray-600 py-1 px-3 font-semibold rounded-r max-w-fit shadow-sm hover:shadow-md"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default IncrementDecrementButton;
