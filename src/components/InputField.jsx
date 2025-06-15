import React from 'react'

const Inputfield = ({label,placeholder,type,icon,onChange,value,name,errorMessage}) => {
  return (
   <>
      <fieldset className='fieldset'>
             <legend className="fieldset-legend text-sm pl-3">{label}</legend>
             <div className={`flex items-center border rounded-full px-4 py-3 ${errorMessage ? 'border-red-500' : 'border-gray-300'}`}>
               <input
                 type={type}
                 placeholder={placeholder}
                 className="w-full outline-none"
                 onChange={onChange}
                 value={value}
                 name={name}
               />
               {/*  */}
               {icon}
             </div>
           </fieldset>
           {errorMessage && <p className="text-sm text-red-500 mt-1 ml-2">{errorMessage}</p>}
   </>
  )
}

export default Inputfield

