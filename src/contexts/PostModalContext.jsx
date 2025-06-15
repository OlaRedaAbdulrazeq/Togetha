// contexts/PostModalContext.jsx
import { createContext, useContext, useState } from "react";

const PostModalContext = createContext();

export const PostModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const openModal = (post = null) => {
    setEditingPost(post);
    setIsOpen(true);
  };

  const closeModal = () => {
    setEditingPost(null);
    setIsOpen(false);
  };

  return (
    <PostModalContext.Provider value={{ isOpen, editingPost, openModal, closeModal }}>
      {children}
    </PostModalContext.Provider>
  );
};

export const usePostModal = () => useContext(PostModalContext);
