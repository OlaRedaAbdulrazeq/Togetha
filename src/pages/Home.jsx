import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import CustomButton from '../components/CustomButton';
import Post from '../components/Post';
import ProfileSide from '../components/SideProfile';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../contexts/PostsContext';
import { deletePost } from '../api/post';
import { toast } from 'react-toastify';
import ConfirmModal from '../components/Confirm';

function Home() {
  const {
    posts,
    setPosts,
    fetchPosts,
    loading,
    updatePostById,
  } = usePosts();

  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostDelete = (postId) => {
    setPostToDelete(postId);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deletePost(postToDelete, user.token);
      setPosts((prev) => prev.filter((post) => post._id !== postToDelete));
      toast.success("Post deleted successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setShowConfirmModal(false);
      setPostToDelete(null);
    }
  };

  const handleUpdate = (updatedPost) => {
    updatePostById(updatedPost);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <div className="w-full md:w-[35%] lg:w-[25%] bg-white p-4 hidden md:flex flex-col items-center gap-6 border-b md:border-b-0 md:border-r md:sticky top-10 md:my-10 h-auto md:h-[calc(100vh-5rem)]">
        {isAuthenticated ? (
          <ProfileSide user={user} />
        ) : (
          <>
            <CustomButton onClick={() => navigate("/login")}>LOGIN</CustomButton>
            <CustomButton onClick={() => navigate("/register")}>SIGNUP</CustomButton>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full md:w-[65%] lg:w-[75%] flex flex-col items-center md:items-start pt-8 px-6 border-r border-gray-300">
        {posts.map((post) => (
          <Post key={post._id} post={post} onDelete={() => handlePostDelete(post._id)} />
        ))}
        {loading && <p className="text-center text-gray-500">Loading posts...</p>}
        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-400">Nothing to show.</p>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 hover:cursor-pointer shadow-md 
            transition duration-400 ease-in-out bg-[#cd6639] hover:bg-[#cd6539e2] text-white border rounded-full px-5 py-5 z-50"
        >
          <FaArrowUp />
        </button>
      )}

      {/* Confirm Delete Modal */}
      {showConfirmModal && (
        <ConfirmModal
          message="Are you sure you want to delete this post?"
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowConfirmModal(false);
            setPostToDelete(null);
          }}
        />
      )}
    </div>
  );
}

export default Home;
