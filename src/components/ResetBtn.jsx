import React from 'react'

const ResetBtn = ({children,onClick}) => {
  return (
    <>
      <button type='reset' className="bg-[#bebebe] hover:bg-[#bebebedd] text-white  font-semibold py-3 px-6 rounded-full shadow-md transition duration-400 ease-in-out mb-4
     hover:cursor-pointer hover:translate-y hover:scale-[98%]"
     onClick={onClick}
     >
    {children}
    </button>
    </>
  )
}

export default ResetBtn
