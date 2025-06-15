import React from 'react';

const CustomButton = ({ children, bgColor, onClick, positionStyle, disabled }) => {
  return (
    <>
      <button
        className={`${bgColor === "white"
          ? "border border-gray-400 hover:bg-gray-50 text-[#cd6639]"
          : "bg-[#cd6639] hover:bg-[#cd6539e2] text-white"
        } 
        text-sm sm:text-base md:text-lg 
        font-semibold 
        py-2 px-4  sm:px-6  md:px-8 
        rounded-full shadow-md 
        transition duration-400 ease-in-out 
        mb-4 hover:cursor-pointer hover:scale-[98%] 
        ${positionStyle}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default CustomButton;
