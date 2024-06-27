import { useState } from 'react';
import Form from './components/Form';
import PostList from './components/PostList';
import { fetchPosts } from './api/api.js'
import { useQuery } from 'react-query';

function App() { 
  const [page, setPage] = useState(1);
  const { data: postData } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page),
  });  
  return (
    <>
      <Form postData={postData}/>
      <h1>Posts</h1>
      <div style={{ display:'flex', justifyContent:'center', gap:'20px', padding:'30px 0px 30px 0px'}}>
        <button onClick={() => setPage(old => Math.max(old - 1, 0))} disabled={!postData?.prev}>Prev</button>
        <span>{page}</span>
        <button onClick={() => setPage(old => old + 1)} disabled={!postData?.next}>Next</button>
      </div>
      <PostList postData={postData} />
    </>
  )
}

export default App
