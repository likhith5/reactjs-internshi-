// src/components/BlogForm.js
import React, { useState, useEffect } from 'react';

const BlogForm = ({ addPost, editPost, currentPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Set form data when editing
  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title);
      setContent(currentPost.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [currentPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPost) {
      editPost({ ...currentPost, title, content });
    } else {
      addPost({ title, content });
    }
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{currentPost ? 'Edit Post' : 'New Post'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">{currentPost ? 'Update Post' : 'Add Post'}</button>
    </form>
  );
};

export default BlogForm;
