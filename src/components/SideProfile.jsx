import React from 'react';
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom';
import avatar from "../assets/avatar.png";
import PostModal from './PostModal';
import { usePostModal } from '../contexts/PostModalContext';

const ProfileSide = ({ user }) => {
  const navigate = useNavigate();
  const { openModal } = usePostModal();
  const avatarUrl = user?.avatar || avatar;

  return (
    <div className="flex flex-col justify-between items-center w-full h-full px-4 mx-1">
      {/* Top Section */}
      <div className="flex flex-col items-center bg-white p-4 rounded-3xl shadow-md w-full text-center">
        <img
          src={avatarUrl}
          alt="profile"
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full mx-auto mb-3 object-cover"
        />
        <p className="font-semibold text-gray-700 text-base sm:text-lg">
          {user?.username?.trim()}
        </p>
        <p className="text-sm text-gray-500 mt-1 mb-3 break-words">{user?.bio || ''}</p>
        <CustomButton bgColor="orange" onClick={() => navigate('/editprofile')}>
          Edit Profile
        </CustomButton>
      </div>

      {/* Bottom Centered POST Button */}
      <div className="mt-4 mb-2 w-full flex justify-center">
        <CustomButton onClick={() => openModal()}>+ POST</CustomButton>
      </div>

      <PostModal />
    </div>
  );
};

export default ProfileSide;
