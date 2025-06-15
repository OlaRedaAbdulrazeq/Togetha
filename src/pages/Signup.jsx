import React, { useState } from 'react';
import Image from '../components/Image';
import Inputfield from '../components/Inputfield';
import { MdEmail } from 'react-icons/md';
import CustomButton from '../components/CustomButton';
import { FaUnlockKeyhole } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../contexts/SignupContext';
import { checkUserAvailability } from '../api/checkUser'; // ✅ Import the API function
import { validateSignup } from '../utils/validation';
import { toast } from 'react-toastify';
import { registerUser } from '../api/user';

const Signup = () => {
  const { signupData, setSignupData } = useSignup();
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
    // Validate current field
  const fieldError = validateSignup({ ...signupData, [name]: value }, true)[name];
  setFormErrors((prevErrors) => ({...prevErrors,[name]: fieldError || "",
  }));
  };

  const handleSubmit = async () => {
     const errors = validateSignup(signupData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    console.log("signupData:", signupData);
    console.log("Submitting to backend...");
    const toastId = toast.loading("Creating your account...");
    try {
       const { username, email, password } = signupData;
      //  const response = await registerUser({ username, email, password });

      await checkUserAvailability({ username, email });
      await registerUser({ username, email, password });
      toast.update(toastId, {
            render: "Account created successfully!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
      navigate("/login", { replace: true });

    } catch (err) {
      const backendError = err.response?.data?.error;

      if (backendError?.toLowerCase().includes("username")) {
        setFormErrors((prev) => ({ ...prev, username: backendError }));
      } else if (backendError?.toLowerCase().includes("email")) {
        setFormErrors((prev) => ({ ...prev, email: backendError }));
      } else {
        toast.error(err || "Something went wrong");
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      <Image />
      <div className="sm:absolute right-[3rem] top-0 bg-white rounded-l-[3.125rem] h-full w-full sm:w-1/2 flex flex-col content-center justify-center px-9 py-13 md:pl-9 lg:px-20 lg:pl-26 z-10">
        <h2 className="card-title text-2xl font-semibold mb-2">Create An Account!</h2>
        <span className='text-sm text-gray-500 mb-4'>Signup to continue</span>

        <Inputfield
          type="text"
          label="USERNAME"
          name="username"
          placeholder="Write Your Name"
          value={signupData.username}
          onChange={handleChange}
          errorMessage={formErrors.username}
        />
        <Inputfield
          type="email"
          label="EMAIL"
          name="email"
          placeholder="Enter a Valid Email"
          icon={<MdEmail className="w-5 h-5 text-gray-400" />}
          value={signupData.email}
          onChange={handleChange}
          errorMessage={formErrors.email}
        />
        <Inputfield
          type="password"
          label="PASSWORD"
          name="password"
          placeholder="Enter a Strong Password"
          icon={<FaUnlockKeyhole className="w-5 h-5 text-gray-400" />}
          value={signupData.password}
          onChange={handleChange}
          errorMessage={formErrors.password}

          
        />
          <Inputfield
          type="password"
          label="REWRITE PASSWORD"
          name="confirmPassword"
          placeholder="Enter a Strong Password"
          icon={<FaUnlockKeyhole className="w-5 h-5 text-gray-400" />}
          value={signupData.confirmPassword}
          onChange={handleChange}
          errorMessage={formErrors.confirmPassword}
        />

        <div className='mt-4'></div>
        <CustomButton onClick={handleSubmit}>SIGNUP</CustomButton>
        <CustomButton bgColor="white" onClick={() => navigate("/login")}>LOGIN</CustomButton>
      </div>
    </div>
  );
};

export default Signup;
