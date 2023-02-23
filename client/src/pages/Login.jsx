import React, {  useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { AppContext } from '../context/authContext'



const Login = () => {

  const {login}=useContext(AppContext)

  const [input,setInput]=useState({
   
    email:'',
    password:''
  })
  const navigate = useNavigate();

  const [err,setError]=useState(null)

  const handleChange=(e)=>{
    
    setInput(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  const handleSubmit=async (e)=>{

    e.preventDefault()

    try {
      await login(input)
      navigate('/');
    } catch (error) {
      setError(error.response.data.error)
      
    }
   

    
  }





  return (
  <div className="auth">
    <h1>Login</h1>
    <form>
        
        <input type="email" name="email"  placeholder='email' onChange={handleChange}/>
        
        <input type="password" name="password" placeholder='password' onChange={handleChange}/>
        <button type="submit" onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        
        <span>Don't you have account? <Link to='/register'>Register</Link></span>
    </form>


  </div>
  )
}

export default Login
