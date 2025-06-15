import React from 'react'
import backgroundImage from "../assets/background.jpeg";

const Image = () => {
  return (
    <>
    <figure className='hidden absolute inset-0  sm:flex sm:w-1/2  bg-gray-100 justify-center items-center '>

        <img
        src={backgroundImage}
        alt="background-image"
        className="hidden sm:inline object-cover w-[100vw] h-[100vh]"
        />
  </figure>
    </>
  )
}

export default Image
