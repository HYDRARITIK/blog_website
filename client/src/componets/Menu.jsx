import React, { useEffect, useState } from "react";

const Menu = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(()=>{
  const fetchPosts=async()=>{
    setLoading(true)
    const res=await fetch("http://localhost:8000/api/posts")
    const data=await res.json()
    setPosts(data)
    setLoading(false)
  }
  fetchPosts()

},[])

  return(<>
     <div className="menu">
        <h1 style={{margin:"0 auto"}}>other post you may Like</h1>
        {posts.map((post) => {
            return(<>
                <div className="post" key={post.id} style={{padding:"10px"}}>
                <img src={post.image} alt="" />

                <h2>{post.title}</h2>

                <button>Read More</button>
              </div>
            </>)
          
          
              
        
          
        })}
      </div>
  </>)

 
    
};

export default Menu;
