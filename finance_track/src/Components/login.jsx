import React, { useState } from 'react';

import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();


  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/login', {
      email,
      password
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus();
        navigate('/Layout');
      }
    });
  }

  return (
    <div className='Home'>
      
      <div className='LogIn'>
        <h1>Evernote</h1>
        <form className='LogInForm' onSubmit={handleSubmit}>
          <label>Email: 
            <input type='email' placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label>Password: 
            <input type='password' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <button > Log In</button><br></br>
          <a href="/Forgot">Forgot Password</a>
        </form>
        
        
        <h3>{loginStatus}</h3>
      </div>
    </div>
  );
}
