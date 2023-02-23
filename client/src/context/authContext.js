
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext()


const AppProvider = ({ children }) => {
    //find current user info in local storage and set it to currentUser
    // const userLocalStorage=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null 
    const [currentUser,setCurrentUser] = useState(null)
    // const navigate = useNavigate();

  const login=async (inputs)=>{
    const resp=await axios.post('http://localhost:8000/api/auth/login',inputs)
    console.log("current_ user_context",resp.data)
    setCurrentUser(resp.data)
    // navigate('/');

  }
  const logoutUser=async ()=>{ 
    await axios.get('http://localhost:8000/api/auth/logout')   
    setCurrentUser(null)
    }

    const getAllPosts=async ()=>{
      const resp=await axios.get('http://localhost:8000/api/posts')
      console.log(resp.data)
    }


    const register=async (inputs)=>{
        const resp=await axios.post('http://localhost:8000/api/auth/register',inputs)
        setCurrentUser(resp.data)
    }
      //set current user to local storage
      useEffect(()=>{
        console.log("current user use effect",currentUser)
        localStorage.setItem('user_react_netlify',JSON.stringify(currentUser))
      },[currentUser])  


  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logoutUser,
        register,
        getAllPosts
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
