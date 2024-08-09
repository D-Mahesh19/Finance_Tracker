import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/register', {
      username,
      email,
      password
    }).then((response) => {
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("Account created successfully");
        navigate('/Home');
      }
    });
  }

  return (
    <div>
      <div className='Register'>
        <form className="Register-form" onSubmit={handleSubmit} action="/Home">
          <h1>Welcome</h1>
          <label>UserName: <br />
            <input type='text' placeholder='Enter your userName' required value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>Email: <br></br>
            <input type='email' placeholder='Enter your email' required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label><br></br>
          <label>Password: <br />
            <input type='password' placeholder='Enter your password' required value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button>Register</button>
          <h3>{registerStatus}</h3>
        </form>
      </div>
    </div>
  );
}
