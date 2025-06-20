import React, { useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import "../crud.css";

const API_URL =`http://localhost:3001/crud`;
const fetchPosts =async () =>{
  const {data} =await axios(API_URL);
  return data;
};
const createPost =async(newPost)=>{
  const {data} =await axios.post(API_URL,newPost);
  return data;
}
const deletePost =async (id)=>{
  await axios.delete(`${API_URL}/${id}`)
}

const updatePost = async (updatedPostData)=>{
  const {data} =await axios.put(`${API_URL}/${updatedPostData.id}`,updatedPostData);
  return data;
}

const Home = () => {
  const queryClient = useQueryClient();
  const [newPostTitle,setNewPostTitle]= useState("");
  const [newPostBody,setNewPostBody] = useState("");
  const [editPost,setEditPost] = useState(null);


  const {data:crud,isLoading,isError}=useQuery({
    queryKey:['crud'],
    queryFn: fetchPosts,
  });

  const createMutation =useMutation({
    mutationFn:createPost,
    onSuccess:(newData)=>{
      console.log(newData);
      queryClient.invalidateQueries({queryKey:['crud']});
      setNewPostBody("");
      setNewPostTitle("");
    }
  });

  const deleteMutation = useMutation({
    mutationFn:deletePost,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['crud']});
    }
  })

  const updateMutation = useMutation({
    mutationFn: updatePost,
     onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['crud']});
      setEditPost(null);
    }
  })

  const handleCreate =()=>{
    createMutation.mutate({title:newPostTitle,body: newPostBody});

  };

  const handleDelete =(id)=>{
    if(confirm("Are you sure to delete ?")){
      deleteMutation.mutate(id);
    }
  }

  const handleUpdate =()=>{
    updateMutation.mutate(editPost);
  }

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error fetching data</div>
  return (
    <div className='container'><h1>Create Read Update Delete</h1>
    <form onSubmit={(e)=>{
      e.preventDefault();
      handleCreate();
    }}>
      <input type="text" placeholder='Post-title' value={newPostTitle} onChange={(e)=> setNewPostTitle(e.target.value)}/>
      <input type="text" placeholder='Post-body' value={newPostBody} onChange={(e)=> setNewPostBody(e.target.value)}/>
      <button type="submit">Create Post</button>
    </form>
    {
    crud.map((post)=>(
      <div className='post-list' key={post.id}>
        {editPost?.id===post.id ?(<div className='edit-form'>
          <input type="text" placeholder='title' value={editPost.title} onChange={(e)=>setEditPost({...editPost,title:e.target.value})}/>
          <input type="text" placeholder='body' value={editPost.body} onChange={(e)=>setEditPost({...editPost,body:e.target.value})}/>
          <button onClick={handleUpdate}>save</button>
          <button className='cancel' onClick={()=>setEditPost(null)}>cancel</button>
        </div>):( <div className='post-item'>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div className="actions">
        <button onClick={()=>setEditPost(post)}>Edit</button>
        <button className='delete' onClick={()=>{handleDelete(post.id)}
        }>Delete</button>
      </div>
      </div>)}
       
    </div>
    ))
    }
    </div>
  )
}

export default Home
