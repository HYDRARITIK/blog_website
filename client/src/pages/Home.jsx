import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../context/authContext";
import axios from "axios";

// allPosts()
const Home = () => {
  // location is an object that contains information about the current URL
  // location.search returns a string containing all
  // the query parameters.
  // Suppose the URL is "some-website.com/profile?id=12454812"
  // then location.search contains "?id=12454812"
  // Now you can use the URLSearchParams API so that you can
  // extract the query params and their values

  const {currentUser}=useContext(AppContext)

  const [posts, setPosts] = useState([]);
  const {pathname}=useLocation()
  
  //fetching data from server based on category
  const fetchCategoryData=async (category)=>{
    console.log("fetxh--->",category);
    
    const res=await fetch(`http://localhost:8000/api/posts/${category}`)
    
    const data=await res.json()
    setPosts(data)
    console.log(data);
    
  }

  //fetching data from server 
  



useEffect(()=>{
  const pathSplit = pathname.split('/');
  const category = pathSplit.length <= 1 ? "":  pathSplit[1];
  console.log("category--->",category);
  fetchCategoryData(category)
},[pathname])
  




  return (
    
    
    <div className="home">
      <div className="posts">
        {posts.map((post) => {
          const { _id, title, content, image } = post;
          return (
            <div className="post" key={_id}>
            <div className="img">
              <img src={image} alt="" />
            </div>
            <div className="content">
          

              <h2>{title}</h2>
            
              <p>{content}</p>
              <Link className="link" to={`/post/${_id}`}>

<h2>Read More</h2>
</Link>

            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
