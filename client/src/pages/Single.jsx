import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
//edit and delete icons
import moment from 'moment'

import {  FaHeart } from "react-icons/fa";
import {AiFillEdit ,AiFillDelete,AiFillLike,AiFillDislike} from "react-icons/ai";
import Menu from '../componets/Menu'
import { AppContext } from '../context/authContext';



const Single = () => {
  const [post,setPost]=useState({})
  const {currentUser}=useContext(AppContext)
  const [likes,setLikes]=useState(0);
  const location=useLocation()
  const post_id=location.pathname.split('/')[2]
  console.log(post_id);
  const postedAgo=moment().fromNow()
  // console.log(postedAgo);
  
  // const [queryParameters] = useSearchParams()
  const handleDelete=async()=>{
    try{
      await axios.delete(`http://localhost:8000/api/posts/post/${post_id}`)
      window.location.replace('/')
    }catch(err){
      console.log(err);
    }
  }

  const handleIncreaseLike=async()=>{
    try{
      await axios.patch(`http://localhost:8000/api/posts/post/${post_id}`,{likes:post.likes+1})
      setLikes(likes+1)
      // window.location.reload()
    }catch(err){
      console.log(err);
    }
  }
  const handleDecreaseLike=async()=>{
    try{
      await axios.patch(`http://localhost:8000/api/posts/post/${post_id}`,{likes:post.likes-1})
      // window.location.reload()
      setLikes(likes-1)

    }catch(err){
      console.log(err);
    }
  }
  

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const res=await axios.get(`http://localhost:8000/api/posts/post/${post_id}`)
        const data=res.data
        console.log("data coming is-->",data);
        setLikes(data.likes)
        setPost(data)
        
      } catch (error) {
        console.log(error);
      }
     
    }
    fetchData()
  },[post_id])
  
 


  return (
    <div className="single" style={{margin:"25px"}}>
      <div className="content">
        <img src="https://picsum.photos/200" alt="" />
      
      <div className="user">
        <img src="https://picsum.photos/200" alt="" />
      </div>
      <div className="info">
        <span>
        {post.category}
        </span>
        <p>{postedAgo}</p>

        {currentUser && 
          <div className="edit" style={{ display:"flex",
          justifyContent:"flex-start",
          // width:"100px",
          // margin:"0 auto"
          gap:"10px"}}>
          <Link to={{pathname:`/write/${post_id}`, state: "post"}}>
          <AiFillEdit/>
          </Link>
          <button onClick={handleDelete}> <AiFillDelete/></button>
          
        </div>
        
        }

        <div 
        style={{
          display:"flex",
          justifyContent:"space-between",


        }}
        >
        <span>likes :{likes}</span>
        <div style={{
          display:"flex",
          justifyContent:"flex-end",
          // width:"100px",
          // margin:"0 auto"
          gap:"10px"

        }}>
        <span onClick={handleIncreaseLike}><AiFillLike/></span>
      <span onClick={handleDecreaseLike}><AiFillDislike/></span>

        </div>
     

        </div>
      


      </div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>


      
      
      </div>

      <Menu />
    </div>
  )
}

export default Single
