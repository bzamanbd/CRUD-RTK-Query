import { useState } from 'react';
import {useGetPostsQuery, useAddPostMutation,useDeletePostMutation} from '../services/redux/apiSlice'
import EditPost from './EditPost';
import './styles/postList.css'

const PostsList = () => { 
    const { data: posts, error, isLoading }  = useGetPostsQuery();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [addPost] = useAddPostMutation();
    const [deletePost] = useDeletePostMutation()
    const [editingPost, setEditingPost] = useState(null);

    const handleEditClick = (post) => {
        setEditingPost(post);
    };

    const handleCancelEdit = () => {
        setEditingPost(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && body) {
          await addPost({ title, body });
          setTitle('');
          setBody('');
        }
      };
    
      const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (isConfirmed) {
        await deletePost(id);
        }
      };

    if(isLoading) return <div>Loading....</div> 
    
    if(error) return <div>Error:{error.message}</div> 
    
    return (
        <div>

          { editingPost ? <h2>Edit the Post</h2> : <h2>All Posts</h2>}
          
          {
          editingPost ? (
            <EditPost post={editingPost} onCancel={handleCancelEdit} />
          ) : ( 
            <> 
            <form onSubmit={handleSubmit} className='form' > 
              <div className='input-container'> 
                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title'/> 
                <input type="text" value={body} onChange={(e)=>setBody(e.target.value)} placeholder='Content' style={{margin:20}}/> 
                <button type='submit'>Add Post</button>
              </div>
            </form>
            <br/>
            {posts.map((post)=>{ 
                const{id, title, body} = post 
                return <div key={id}>
                     <h3>{title}</h3>
                     <p>{body}</p>
                     <button onClick={() => handleDelete(id)}>Delete</button>
                     <button onClick={() => handleEditClick(post)} style={{marginLeft: '20px'}}>Edit</button>
                </div>
            })}
            </>
          )
          }
        </div>
      );

}

export default PostsList
