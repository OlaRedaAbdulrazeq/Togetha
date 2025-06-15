import React from "react";

const SubmitBtn = ({ children ,disabled,onClick}) => {
  return (
    <>
      <button
        type="submit"
        className="bg-[#cd6639] hover:bg-[#cd6539e2] text-white font-semibold py-2 px-7 rounded-full shadow-md transition duration-400 ease-in-out mb-4
        hover:cursor-pointer hover:translate-y hover:scale-[98%]"
        disabled={disabled}
        onClick={onClick}

      >
        {children}
      </button>
    </>
  );
};

export default SubmitBtn;
