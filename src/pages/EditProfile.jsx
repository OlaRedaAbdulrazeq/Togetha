import ResetBtn from "../components/ResetBtn";
import avatar from "../assets/avatar.png";
import Inputfield from "../components/Inputfield";
import SubmitBtn from "../components/SubmitBtn";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSignup } from "../contexts/SignupContext";
import { editUserProfile, getProfile } from "../api/user";
import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { validateProfileInfo } from '../utils/validation';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const { signupData, setSignupData } = useSignup();
  const [searchParams] = useSearchParams();
  const fromEdit = searchParams.get("edit") === "true";
  const navigate = useNavigate();
  const { user: contextUser, login } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      login(JSON.parse(storedUser), storedToken);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (signupData.avatarPreview) {
        URL.revokeObjectURL(signupData.avatarPreview);
      }
    };
  }, [signupData.avatarPreview]);

  useEffect(() => {
    if (contextUser) {
      setSignupData(prev => ({
        ...prev,
        username: contextUser.username,
        email: contextUser.email,
        firstName: contextUser.firstName || '',
        lastName: contextUser.lastName || '',
        bio: contextUser.bio || '',
        avatarPreview: contextUser.avatar || avatar,
        avatar: null,
      }));
    }
  }, [contextUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...signupData, [name]: value };
    setSignupData(updatedData);
    const fieldError = validateProfileInfo(updatedData, true)[name];
    setFormErrors(prevErrors => ({ ...prevErrors, [name]: fieldError || "" }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      const updatedData = { ...signupData, avatar: file, avatarPreview: preview };
      setSignupData(updatedData);
      const fieldError = validateProfileInfo(updatedData, true)["avatar"];
      setFormErrors(prevErrors => ({ ...prevErrors, avatar: fieldError || "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const errors = validateProfileInfo(signupData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      toast.error("Please fix the errors above.");
      return;
    }

    setFormErrors({});
    const previousUser = { ...contextUser };
    const optimisticUser = {
      ...contextUser,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      bio: signupData.bio,
      avatar: signupData.avatarPreview || contextUser.avatar,
    };
    login(optimisticUser, contextUser.token);

    const toastId = toast.loading("Updating profile...");

    try {
      const formData = new FormData();
      formData.append("firstName", signupData.firstName);
      formData.append("lastName", signupData.lastName);
      formData.append("bio", signupData.bio);
      if (signupData.avatar) {
        formData.append("avatar", signupData.avatar);
      }
      const token = contextUser?.token || localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      await editUserProfile(formData, token);
      const freshUser = await getProfile(token);
      login(freshUser, token);
      toast.update(toastId, {
        render: "Profile updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Update profile error:", err);
      login(previousUser, previousUser.token);

      toast.update(toastId, {
        render: err.response?.data?.error || "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-full bg-white flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-lg p-6 flex flex-col items-center">
        {/* Cancel Button */}
        <div className="w-full flex justify-end">
          <ResetBtn onClick={() => navigate(-1)}>Cancel</ResetBtn>
        </div>

        {/* Welcome Title */}
        <div className="text-center mt-2 mb-4">
          <h2 className="text-xl font-semibold">
            Welcome {signupData.username ? `, ${signupData.username}` : ""}
          </h2>
          <p className="text-sm text-gray-500">
            Thanks for choosing us!
          </p>
        </div>

        {/* Avatar */}
        <div className="relative w-24 h-24 mb-4">
          <img
            src={signupData.avatarPreview || avatar}
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full ring ring-[#cd6639] ring-offset-2"
          />
          <label className="absolute bottom-0 right-0 text-xl bg-white rounded-full p-1 cursor-pointer shadow">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <FaRegEdit />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          <Inputfield
            type="text"
            label="Bio"
            name="bio"
            placeholder="Write your bio here"
            value={signupData.bio}
            onChange={handleChange}
            errorMessage={formErrors.bio}
          />
          <Inputfield
            type="text"
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            value={signupData.firstName}
            onChange={handleChange}
            errorMessage={formErrors.firstName}
          />
          <Inputfield
            type="text"
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
            value={signupData.lastName}
            onChange={handleChange}
            errorMessage={formErrors.lastName}
          />
          <div className="pt-2">
            <SubmitBtn disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Edit Profile"}
            </SubmitBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
