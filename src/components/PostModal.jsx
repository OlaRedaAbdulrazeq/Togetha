import React from 'react';
import AddPost from '../pages/AddPost';
import { usePostModal } from '../contexts/PostModalContext';
import { usePosts } from '../contexts/PostsContext';

const PostModal = () => {
  const { isOpen, closeModal } = usePostModal();
  const { updateExistingPost, addNewPost } = usePosts(); // ✅ import from context


  return (
    <dialog id="post_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-2xl bg-white rounded-2xl p-6 shadow-lg relative">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold mb-4">
          Share Something
        </h3>

        <AddPost  />
      </div>

    
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>close</button>
      </form>
    </dialog>
  );
};

export default PostModal;
