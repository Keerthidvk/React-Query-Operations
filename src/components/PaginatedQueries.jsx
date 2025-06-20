import React, { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchItems=(pageNumber)=>{
  return axios.get(`http://localhost:3001/items?_limit=10&_page=${pageNumber}`)
};

const PaginatedQueries = () => {
  const [page,setPage] = useState(1);

  const {data,isLoading,isError,error} = useQuery({
    queryKey:["items",page],
    queryFn:() =>fetchItems(page),
    placeholderData:keepPreviousData
  });
 
  if(isLoading){
    return <h2>Page is Loading...</h2>
  };
  if(isError){
    return <h2>{error.message}</h2>
  };
  
  return (
    <div className='container'>
      <h3> PaginatedQueries</h3>
      {data?.data.map((item)=>{
        return <div key={item.id} className='item'>
          {item.name}
        </div>;
      })}
      <div >
        <button className='but' onClick={()=>{ setPage((prev)=> prev-1)}} disabled={page==1? true:false}>Previous</button>
        {Array.from({length:10},(_,i) =>i+1).map((pageNumber)=>(
          <button key={pageNumber} className='arr-but'style={{backgroundColor : page=== pageNumber? "green":"",
            color: page=== pageNumber? "white":"black",
           fontWeight: page=== pageNumber? "bold":"normal"            
          }} onClick={()=>setPage(pageNumber)} disabled={page==pageNumber? true:false}>{pageNumber}</button>
        ))}
        <button className='but' onClick={()=>{ setPage((prev)=> prev+1)}} disabled={page==10? true:false}>Next</button>
        </div>
        </div>
  )
}

export default PaginatedQueries