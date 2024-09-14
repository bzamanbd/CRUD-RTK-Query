import { useState } from 'react';
import { useUpdatePostMutation } from '../services/redux/apiSlice';
import './styles/editPost.css'

const EditPost = ({ post, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [updatePost] = useUpdatePostMutation();
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updatePost({ id: post.id, title, body });
    onCancel(); 
  };

  return (
    <form onSubmit={handleUpdate} className="form">
      <div className="input-container">
      <input type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <span></span>
      </div>
  
      <div className="input-container">
         <input 
          value={body} 
          onChange={(e) => setBody(e.target.value)}
          placeholder='content goes here'
          > 
         </input>

      </div>

      <button type="submit" className='submit'>Update Post</button>
      
      <div> 
      <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditPost;
