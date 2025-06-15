import React, { useState, useEffect } from 'react';
import { createPost, updatePost } from '../api/post';
import { useUser } from '../contexts/UserContext';
import { usePostModal } from '../contexts/PostModalContext';
import SubmitBtn from '../components/SubmitBtn';
import ResetBtn from '../components/ResetBtn';
import Inputfield from '../components/Inputfield';
import { validatePostInfo } from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../contexts/PostsContext';
import { toast } from 'react-toastify';

const AddPost = () => {
  const { user } = useUser();
  const { closeModal, editingPost } = usePostModal();
  const {  addNewPost,deletePostById ,updatePostById ,fetchPosts} = usePosts();
  const [form, setForm] = useState({ title: '', description: '' });
  const [images, setImages] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (editingPost) {
      setForm({
        title: editingPost.title || '',
        description: editingPost.description || '',
      });
      setImages(editingPost.images || []);
    } else {
      setForm({ title: '', description: '' });
      setImages([]);
    }
    setFormErrors({});
  }, [editingPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };

    setForm(updatedForm);

    const fieldError = validatePostInfo({ ...updatedForm, images }, true)[name];
    setFormErrors((prev) => ({ ...prev, [name]: fieldError || '' }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const imageError = validatePostInfo({ ...form, images: files }, true).images;
    setFormErrors((prev) => ({ ...prev, images: imageError || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasSubmitted) return;

    const validationErrors = validatePostInfo({ ...form, images });
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    setHasSubmitted(true);
try {
    let result;

    if (!editingPost) {
      closeModal(); 
      const tempId = `temp-${Date.now()}`;

      const optimisticPost = {
        _id: tempId,
        title: form.title,
        description: form.description,
        images: images.map(img => URL.createObjectURL(img)), 
        author: {
          _id: user.id,
          username: user.username,
          avatar: user.avatar
        },
        createdAt: new Date().toISOString(),
        isTemporary: true
      };
      addNewPost(optimisticPost); 
      toast.success("Post Added Successfully");
 
      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("description", form.description);
      images.forEach((img) => payload.append("images", img));
    try {
        const savedPost = await createPost(payload, user.token);
        updatePostById({ ...savedPost });
        setForm({ title: '', description: '' });
        setImages([]);
        setFormErrors({});
        setHasSubmitted(false);
        await fetchPosts();
        
      } catch (err) {
        // rollback
        deletePostById(tempId); // Remove temporary post
        toast.error("Something went Wrong , Can't upload Post");
        console.log(err)
      }

}
if (editingPost) {
   let updatedPost;
   const isImageUpdated = images.some((img) => typeof img !== "string");
    if (isImageUpdated) {
          const formData = new FormData();
          formData.append("title", form.title);
          formData.append("description", form.description);
          images.forEach((img) => formData.append("images", img));
          updatedPost = await updatePost(editingPost._id, formData, user.token);
        } else {
          updatedPost = await updatePost(
            editingPost._id,
            {
              title: form.title,
              description: form.description,
              images,
            },
            user.token
          );
        }
        if (typeof updatedPost.author === "string") {
          updatedPost.author = {
            _id: updatedPost.author,
            username: user.username,
            avatar: user.avatar,
          };
        } else {
          updatedPost.author.avatar = user.avatar;
        }
        updatePostById(updatedPost);
        toast.success("Post updated successfully");
        closeModal();
        await fetchPosts();
      }   
 } catch (err) {
      toast.error("Failed to submit post");
      console.error(err);
    } finally {
      setHasSubmitted(false);
    }

};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-2">
        {editingPost ? 'Edit Post' : 'Create Post'}
      </h2>

      <Inputfield
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Post Title"
        errorMessage={formErrors.title}
      />
      <Inputfield
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Write Your Description here"
        errorMessage={formErrors.description}
      />

      {!editingPost && (
        <div className="w-full">
          <input
            type="file"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className={`file-input w-full ${formErrors.images ? 'border-red-500' : ''}`}
          />
          {formErrors.images && (
            <p className="text-red-500 text-sm mt-1">{formErrors.images}</p>
          )}
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={typeof img === 'string' ? img : URL.createObjectURL(img)}
            alt="preview"
            className="w-20 h-20 object-cover rounded"
          />
        ))}
      </div>

      <div className="flex justify-around">
        <SubmitBtn disabled={Object.values(formErrors).some(Boolean)}>
          {editingPost ? 'Update Post' : 'Post'}
        </SubmitBtn>
        <ResetBtn onClick={closeModal}>Cancel</ResetBtn>
      </div>
    </form>
  );
};

export default AddPost;
