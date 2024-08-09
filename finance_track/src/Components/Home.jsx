import React from 'react'
import logo from '../Assets/5029190.jpg'
import { Link } from 'react-router-dom'


export default function() {
  return (
    <div className='first'>
      <h1>Welcome to the Financial Tracking Application</h1>
      <img src={logo} alt="" />
     
      <button className='login-btn'><Link to='/LogIn'  className='link-cbtn'>Sign In</Link></button>
      <button className='signup-btn'><Link to='/Register'  className='link-cbtn'>Sign Up</Link></button>
    </div>
  )
}
