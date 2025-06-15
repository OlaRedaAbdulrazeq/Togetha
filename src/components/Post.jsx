import React, { useState, useRef, useEffect } from 'react';
import { BiWorld } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa6';
import { BsThreeDots } from 'react-icons/bs';
import avatar from '../assets/avatar.png';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { usePostModal } from '../contexts/PostModalContext';
import SubmitBtn from './SubmitBtn';
import ConfirmModal from './Confirm'
import { usePosts } from "../contexts/PostsContext";
import { deletePost as deletePostFromAPI } from "../api/post";
import { useUser } from "../contexts/UserContext";
import { toast } from "react-toastify";

const Post = ({ post}) => {
  const {
    author = {},
    title,
    description,
    images = [],
    createdAt,
  } = post;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const { user } = useUser();
  const { openModal } = usePostModal();
const [showConfirm, setShowConfirm] = useState(false);
const { deletePostById } = usePosts();

 

  const formattedDate = new Date(createdAt).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    day: 'numeric',
    month: 'short',
  });

  const handleEdit = () => {
  openModal(post);
};

const handleDelete = () => {
  setShowConfirm(true);
};const confirmDelete = async () => {
  try {
    await deletePostFromAPI(post._id, user.token);
    deletePostById(post._id); // Update UI
    toast.success("Post deleted Successfully");
  } catch (err) {
    console.error("Delete failed:", err);
    toast.error("Failed to delete post");
  } finally {
    setShowConfirm(false);
  }
};

const cancelDelete = () => {
  setShowConfirm(false); // Just close modal
};

  return (
    <div className="bg-gray-100 rounded-3xl p-4 w-full max-w-xl mb-6 relative">
      
    {author && (user?._id === author._id || user?.id === author._id)&& (
  <div className="absolute top-4 right-4 z-10" ref={menuRef}>
    <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 hover:text-black cursor-pointer">
      <BsThreeDots size={20} />
    </button>
    {menuOpen && (
      <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg  rounded-lg py-1 dropdown-content">
        <button
          onClick={handleEdit}
          className="flex items-baseline justify-center gap-x-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
        >
         <span className='pr-3'>Edit Post</span><CiEdit className='size-5' />
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-x-1 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left cursor-pointer"
        >
          <span>Delete Post</span><MdDelete className='size-5'/>
        </button>
      </div>
    )}
    </div>
 )}
      {/* Header */}
      <div className="flex items-center mb-2">
        <img
          src={user?.id === author?._id ? user.avatar : author?.avatar || avatar }
          alt={author.username || "Avatar"}
          className="w-10 h-10 rounded-full mr-2 object-cover"
        />
        <div>
          <p className="font-semibold">{author.username }</p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            {formattedDate} <BiWorld className="inline" size={12} />
          </p>
        </div>
      </div>

      {/* Content */}
      <h3 className="font-bold text-base mb-1">{title}</h3>
      <p className="mb-2 text-sm text-gray-700">{description}</p>

      {images.length > 0 && (
        <div className="w-full h-80 rounded-xl overflow-hidden mb-2">
          <img
            src={images[0]}
            alt="post"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {showConfirm && (
        <ConfirmModal
            message="Are you sure you want to delete this post?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
    </div>
  );
};

export default Post;
