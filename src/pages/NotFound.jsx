import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../components/CustomButton';

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center pt-30  gap-y-5 text-center '>
    <div class="text-[4rem] bg-gradient-to-l from-[#E5855D] to-[#B62403] bg-clip-text text-transparent">
                404
    </div>
    <div className='text-[3rem]'>OOOPS ! PAGE NOT FOUND</div>
    <div className='py-3'>
        <CustomButton onClick={()=>navigate("/")}>Go Home</CustomButton>
    </div>
    
      
    </div>
  )
}

export default NotFound
