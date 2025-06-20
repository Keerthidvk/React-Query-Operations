import axios from 'axios';
import React, { use } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
const fetchPostById = (postId) => {
    return axios.get(`http://localhost:3001/posts/${postId}`)
  };

const ReactQueryById = () => {
    const {postId} = useParams();
    const {data , isLoading, error, isError} =useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPostById(postId),
    });
  if(isLoading){
    return <div>Page is Loading</div>
  }
  if(isError){
    return <div>Error has Occured</div>
  }
  const {title,body} =data?.data ||{};
  return (
    <div className='container'>
      <div className='posts'>
        <h3>{title}</h3>
        <p>{body}</p>
        </div>
    </div>
  )
}

export default ReactQueryById