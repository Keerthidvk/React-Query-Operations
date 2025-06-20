import {React,useEffect,useState} from 'react'
import axios from 'axios';

const RegularFetch = () => {
    const [posts, setPosts] = useState([]);
    const [isloading, isSetLoading] = useState(true);
    const [iserror, setIsError] = useState(false);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:3001/posts");
            setPosts(response.data);
        }catch (error) {
            setIsError(error);}
            finally{
                isSetLoading(false);
            }};
            
        useEffect(() => {
            fetchPosts();}, []);

    if (isloading) {
        return <div className='container'>Loading...</div>;}
    if (iserror) {
        return <div className='container'>Something went wrong: {iserror.message}</div>;}
  return (
    <div className='container'><h3>Regualar Fetch Component
        </h3>
        <ul className='posts'>
            {posts.map((post) => (
                <li key={post.id} className='post'>
                    {post.title}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default RegularFetch