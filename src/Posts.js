import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import './Posts.css';

function Posts() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function getPosts() {
    async function getPostsOnMount() {
      setLoading(true);
      const resp = await axios.get('https://workers.lancelee28851234.workers.dev/posts');
      setPosts((p) => resp.data.sort((a,b) => (b.votes - a.votes)));
      setLoading(false);
    };
    getPostsOnMount();
  }, []);

  return (
    <div className='posts'>
      {loading 
       ? 'Loading...'
       : posts.map(p => 
        <PostCard
        key={p.id} data={p}/>)}
    </div>
  )
}

export default Posts;