import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchItems =(pageParam) => {
  return axios.get(`http://localhost:3001/items?_limit=10&_page=${pageParam}`);
}

const Infinitequeries = () => {
    const {data, isLoading, isError, error,fetchNextPage,hasNextPage } = useInfiniteQuery({
        queryKey: ['items'],
        queryFn:fetchItems,
        InitialPageParam:1,
        getNextPageParam: (lastPage, allpages) => {
            
        const nextPage = allpages.length + 1;
        return allpages.length < 10 ? nextPage : undefined;
        }
    });
    if (isLoading) {
        return <div className='container'>Loading...</div>;
    }                           
    if (isError) {
        return <div className='container'>Something went wrong: {error.message}</div>;
    };
    console.log(data);
  return (
    <div className='container'>
     
        <h3>Infinite queries By Click</h3>
        <div>
            {data?.pages.map((page)=>
            (
                page.data.map((item)=>(
                    <div key={item.id}  className='item'>{item.name}</div>
                ))
            ))}
        </div>
        <button onClick={fetchNextPage} className='but' disabled={!hasNextPage}> Load More</button>
    </div>
  )
}

export default Infinitequeries