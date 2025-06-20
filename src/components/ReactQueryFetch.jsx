import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const fetchPosts = async () => {
    return axios.get("http://localhost:3001/posts")
        };
const ReactQueryFetch = () => {
    const {data,isLoading,error, isError}=useQuery({
        queryKey:['posts'],
        queryFn:()=> fetchPosts(),
    });
    if (isLoading) {
        return <div className='container'>Loading...</div>;
    }
    if (isError) {
        return <div className='container'>Something went wrong: {error.message}</div>;
    }

  return (
    <div className='container'><h3>React Query Fetch</h3>
    <ul  className='posts'>
        {data?.data.map((post) => (
           <Link  key={post.id} to={`/react-query/${post.id}`}> <li className='post'>
            {post.body}
            </li></Link>
        ))}
    </ul>
    </div>
  )
}

export default ReactQueryFetch