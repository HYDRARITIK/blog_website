import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register= () => {
  const [input,setInput]=useState({
    username:'',
    email:'',
    password:''
  })
  const [err,setError]=useState(null)
  const navigate = useNavigate();

  const handleChange=(e)=>{
    
    setInput(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  const handleSubmit=async (e)=>{

    e.preventDefault()
    try {

      const res=await axios.post('http://localhost:8000/api/auth/register',input)
      console.log(res.data)
      navigate('/login');

    } catch (error) {
      setError(error.response.data.error)
    }
    
 

  }

  return (
  <div className="auth">
    <h1>Register</h1>
    <form>
        
        <input type="text" name="name"   placeholder='username' onChange={handleChange} />
        <input type="email" name="email"  placeholder='email' onChange={handleChange} />
        <input type="password" name="password" placeholder='password' onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>Register</button>

        {err && <p>{err}</p>}
        
        <span>Do you have account? <Link to='/login'>Login</Link></span>
    </form>


  </div>
  )
}

export default Register
