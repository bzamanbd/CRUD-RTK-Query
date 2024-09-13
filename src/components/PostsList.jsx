import { useState } from 'react';
import {useGetPostsQuery, useAddPostMutation,useDeletePostMutation} from '../services/redux/apiSlice'
import EditPost from './EditPost';

const PostsList = () => { 
    const { data: posts, error, isLoading }  = useGetPostsQuery();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [addPost] = useAddPostMutation();
    const [deletePost] = useDeletePostMutation();

    // State to manage the selected post to edit
    const [editingPost, setEditingPost] = useState(null);

    // Handler to set the selected post for editing
    const handleEditClick = (post) => {
        setEditingPost(post);
    };

    // Handler to clear the selected post after editing
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
        await deletePost(id);
      };

    if(isLoading) return <div>Loading....</div> 
    
    if(error) return <div>Error:{error.message}</div> 
    
    return (
        <div>
          <h2>All Posts</h2>
          
          {editingPost ? (
            <EditPost post={editingPost} onCancel={handleCancelEdit} />
          ) : ( 
            <> 
            <form onSubmit={handleSubmit} > 
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title'/> 
            <input type="text" value={body} onChange={(e)=>setBody(e.target.value)} placeholder='Content' style={{margin:20}}/> 
            <button type='submit'>Add Post</button>
            </form>
            <br/>
            <br/>
            <br/>
            {posts.map((post)=>{ 
                const{id, title, body} = post 
                return <div key={id}>
                     <h3>{title}</h3>
                     <p>{body}</p>
                     <button onClick={() => handleDelete(id)}>Delete</button>
                     <button onClick={() => handleEditClick(post)}>Edit</button>
                </div>

            })}
            </>

            // <ul>
            //   {posts.map((post) => (
            //     <li key={post.id}>
            //       <strong>{post.title}</strong> - {post.content}
            //       <button onClick={() => handleEditClick(post)}>Edit</button>
            //       <button onClick={() => handleDelete(post.id)}>Delete</button>
            //     </li>
            //   ))}
            // </ul>
          )}
        </div>
      );

}

export default PostsList
