  import React, { useState } from 'react'
  import { MdEmail } from "react-icons/md";
  import { FaUnlockKeyhole } from "react-icons/fa6";
  import Inputfield from '../components/Inputfield';
  import CustomButton from '../components/CustomButton';
  import Image from '../components/Image';
  import { Navigate, useNavigate } from 'react-router-dom';
  import api from '../api/axios';
  import { useUser } from '../contexts/UserContext';
  import { loginUser } from '../api/user';
import { validateLoginInfo } from '../utils/validation';

  const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useUser();

      const handleInputChange = (e) => {
      const { name, value } = e.target;
        setServerError(null);
    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };

      if (name === 'email') {
        const { email: emailError } = validateLoginInfo(updatedForm);
        setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
      }
      if (name === 'password' && value.trim() !== '') {
      setErrors((prevErrors) => ({ ...prevErrors, password: null }));
    }


      return updatedForm;
    });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const validationErrors = validateLoginInfo(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setServerError(null);

        try {
      const data = await loginUser({ email: form.email, password: form.password });
      console.log("Login response:", data);
      login(data.user, data.token);
      navigate("/", { replace: true });
      } catch (err) {
       setServerError(err.response?.data?.message || 'Login failed. Please try again.');
      console.log(err);
        
      } finally {
        setIsLoading(false);
      }
    };


    return (
      
      <div className="relative w-full min-h-screen" >
            <Image />
          <div className="sm:absolute right-[3rem] top-0 bg-white rounded-l-[3.125rem] h-full w-full sm:w-1/2 flex flex-col content-center justify-center px-9 py-23 md:pl-9 lg:px-20 lg:pl-26 z-10">
              <h2 className="card-title text-2xl font-semibold mb-2">Welcome Back!</h2>
              <span className='text-sm text-gray-500 mb-6'>Sign in to continue</span>
              <Inputfield
               type="email" 
               label="EMAIL"
                name="email" 
                value={form.email}  
                onChange={handleInputChange}
                 placeholder="Enter Your Email " 
                 icon={<MdEmail className="w-5 h-5 text-gray-400" />} 
                 errorMessage={errors.email}
                 /> 
              <Inputfield 
                  type="password" 
                  label="PASSWORD" 
                  name="password"
                  value={form.password}
                  onChange={handleInputChange} 
                  placeholder="Enter Your Password" 
                  icon={<FaUnlockKeyhole className="w-5 h-5 text-gray-400" />}
                  errorMessage={errors.password}
                  />
              <div className="text-right text-sm text-gray-500 mb-6 cursor-pointer hover:underline">Forgot Password?</div>
               {serverError && <p className="text-red-500 text-sm mb-4">{serverError}</p>}
              <CustomButton onClick={handleSubmit} disabled={isLoading} > {isLoading ? 'LOGGING IN...' : 'LOGIN'}</CustomButton>
              <CustomButton bgColor="white" onClick={()=>navigate('/register')}>CREATE AN ACCOUNT</CustomButton>
 {/* / */}
          </div>
      </div>
    )
  }
  export default Login ;
