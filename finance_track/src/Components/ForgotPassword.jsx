import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [changePasswordMessage, setChangePasswordMessage] = useState('');
  const navigate = useNavigate();

  function ChangePassword (e){
    e.preventDefault();
     axios.put('http://localhost:3000/Forgot', {email,password})
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
          navigate('/LogIn')
        } else {
        setChangePasswordMessage("error changing data");
        }
      })
  };
  return (
    <div className='Forgot'>
        <div className='forgot-data'>
            <form className='ChangePassword' onSubmit={ChangePassword}>
                <h1>Change your password</h1>
                <input type="email" placeholder='enter your email' value={email}  onChange={(e)=>{setEmail(e.target.value)}} required/>
                <br></br>
                <input type='password' placeholder='enter your new password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required  />
                <br></br>
            
                <button type='submit'>Change Password</button>
                

            </form>
        </div>
    </div>
  )
}

