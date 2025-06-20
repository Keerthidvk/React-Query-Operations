import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPosts = async () => {
    return axios.get("http://localhost:3001/posts")
        };
const ReactQueryFetchByClick = () => {
    const {data,isLoading,error, isError,refetch}=useQuery({
        queryKey:['posts'],
        queryFn:()=> fetchPosts(),
        enabled: false // Disable automatic fetching
    });
    if (isLoading) {
        return <div className='container'>Loading...</div>;
    }
    if (isError) {
        return <div className='container'>Something went wrong: {error.message}</div>;
    }

  return (
    <div className='container'><h3>React Query Fetch By Click</h3>
   {data ? ( <ul  className='posts'>
        {data?.data.map((post) => (
            <li key={post.id}  className='post'>
            {post.body}
            </li>
        ))}
    </ul>) :(<div></div>)
}
    <button onClick={refetch} className='btn' style={{margin:"10px"}} >Load Data</button>
    </div>
  )
}

export default ReactQueryFetchByClick