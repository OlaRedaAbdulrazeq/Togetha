import React, { createContext, useContext, useState, useEffect } from "react";
import { getPosts as fetchPostsFromAPI, getPosts } from "../api/post";

const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    if (loading || !hasMore) return; // prevent race
    setLoading(true);
    try {
      const newPosts = await getPosts(page);
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => {
          const existingIds = new Set(prev.map((p) => p._id));
          const uniqueNewPosts = newPosts.filter(
            (p) => !existingIds.has(p._id)
          );
          return [...prev, ...uniqueNewPosts];
        });
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

const deletePostById = (postId) => {
  setPosts((prev) => prev.filter((post) => post._id !== postId));
};

const updateAuthorAvatar = (userId, newAvatar) => {
  setPosts((prev) =>
    prev.map((post) =>
      post.author._id === userId
        ? { ...post, author: { ...post.author, avatar: newAvatar } }
        : post
    )
  );
};
const updatePostById = (updatedPost) => {
  setPosts((prevPosts) =>
    prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
  );
};
  const addNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  useEffect(() => {
    loadPosts();
  }, []);
const fetchPosts = async () => {
    try {
      const fetched = await getPosts();
      setPosts(fetched);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts(); // Load posts on mount
  }, []);
  return (
    <PostsContext.Provider
       value={{ posts, setPosts,hasMore, loading, loadPosts, addNewPost,  updatePostById ,deletePostById,updateAuthorAvatar ,fetchPosts }}
    >
      {children}
    </PostsContext.Provider>
  );
};
