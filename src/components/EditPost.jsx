// src/components/EditPost.js

import { useState } from 'react';
import { useUpdatePostMutation } from '../services/redux/apiSlice';

// eslint-disable-next-line react/prop-types
const EditPost = ({ post, onCancel }) => {
  // eslint-disable-next-line react/prop-types
  const [title, setTitle] = useState(post.title);
  // eslint-disable-next-line react/prop-types
  const [body, setBody] = useState(post.body);
  const [updatePost] = useUpdatePostMutation();
  

  // Handler for updating a post
  const handleUpdate = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/prop-types
    await updatePost({ id: post.id, title, body });
    onCancel(); // Call onCancel to hide the edit form after updating
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
      type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Content"
      />
      <button type="submit">Update Post</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditPost;
