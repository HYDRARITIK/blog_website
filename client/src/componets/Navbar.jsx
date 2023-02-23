import React, { useContext } from 'react'
import Logo from '../img/posts/01.jpg'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/authContext'

const Navbar = () => {
    const {currentUser,logoutUser}=useContext(AppContext)
    console.log("current user is-->",currentUser)

  return (
   <div className="navbar">
    <div className="container_navbar">
        <div className="logo">
            <img src={Logo} alt="" />
        </div>
        <div className="nav-links">
        <Link className='link' to={`/`}>
                home
            </Link>
            <Link className='link' to={`/art`}>
                Art
            </Link>

            <Link className='link' to={`/music`}>
                Music
            </Link>
            <Link className='link' to={`/travel`}>
                Travel
            </Link>
            <Link className='link' to={`/food`}>
                Food
            </Link>

            <span>
               Hi  {currentUser && (currentUser.userName || "johndoe")}
            </span>
            {currentUser && <span onClick={logoutUser}>
                Logout
            </span>}
            <>
            {!currentUser && <Link to={'/register'}>Register </Link>}
            </>
            
            <span className='write'>
                {currentUser && <Link to={'/write'}>WritePost </Link>}
            </span>

        
        </div>
    </div>
   </div>
  )
}

export default Navbar
