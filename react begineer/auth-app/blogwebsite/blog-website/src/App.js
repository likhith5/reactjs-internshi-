
import React, { useState } from 'react';
import BlogForm from './component/blogfrom';
import BlogList from './component/bloglist';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  
  const addPost = (post) => {
    setPosts([...posts, { ...post, id: Date.now() }]);
  };

  
  const editPost = (post) => {
    setPosts(posts.map((p) => (p.id === post.id ? post : p)));
    setCurrentPost(null);
  };

  
  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="App">
      <h1>Blog Website</h1>
      <BlogForm addPost={addPost} editPost={editPost} currentPost={currentPost} />
      <BlogList posts={posts} setCurrentPost={setCurrentPost} deletePost={deletePost} />
    </div>
  );
};

export default App;
