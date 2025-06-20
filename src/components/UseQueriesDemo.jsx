import React from 'react'
import axios from 'axios';
import { useQueries } from '@tanstack/react-query';
const fetchPostById = async (id) =>{
    const response =await axios.get(`http://localhost:3001/posts/${id}`);
    return response.data;
}
const MultiplePosts =({postIds})=>{
    const postqueries = useQueries({
        queries: postIds.map((id)=>({
           queryKey:["posts",id],
           queryFn:() => fetchPostById(id), 
        })),
    });
    const isLoading =postqueries.some((query)=>query.isLoading);
    if(isLoading){
      return <div>Loading...</div>
    }
    return (
    <div className='container'><div className='posts'>
      <h3> Post Details
      </h3>
      {
        postqueries.map((query,index)=>(<div className='post' key={index}>
          <h4>{query.data.id}.{query.data.title}</h4>
          <p>{query.data.body}</p>
        </div>))
      }
    </div>
    </div>);
    
}
const UseQueriesDemo = () => {
    const postIds=[1,3,4,5,7];
  return (
    <div className='container'><h3>Use Queries Demo</h3>
    <MultiplePosts postIds={postIds}/>
    </div>
  )
}

export default UseQueriesDemo