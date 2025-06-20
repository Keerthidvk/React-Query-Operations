import React  from 'react'
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
const fetchItems =(pageParam) => {
  return axios.get(`http://localhost:3001/items?_limit=10&_page=${pageParam}`);
}

const queryScroll = () => {
    const {data, isLoading, isError, error,fetchNextPage,isFetching } = useInfiniteQuery({
            queryKey: ['items'],
            queryFn:fetchItems,
            InitialPageParam:1,
            getNextPageParam: (lastPage, allpages) => {
                
            if (allpages.length < 10) {
                const nextPage = allpages.length + 1;
                return nextPage;
            }
            else{
                return undefined;   
            }
        }});
        const {ref,inView}= useInView();
        useEffect(() => {
            if (inView ) {
                fetchNextPage();
            }
        },[inView]);

        if (isLoading) {
            return <div className='container'>Loading...</div>;
        }                           
        if (isError) {
            return <div className='container'>Something went wrong: {error.message}</div>;
        };
        console.log(data);
      return (
        <div className='container'>
         
            <h3>Infinite queries By Scroll</h3>
            <div>
                {data?.pages.map((page)=>
                (
                    page.data.map((item)=>(
                        <div key={item.id}  className='item'>{item.name}</div>
                    ))
                ))}
            </div>
            <div ref={ref} style={{margin:"10px"}}>{isFetching?"Loading...":"No More Records..."}</div>
        </div>
      )

  
}

export default queryScroll