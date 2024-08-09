import React, { useState } from 'react'
import axios from 'axios'

export default function Profile() {
    const [user_popup_name, setUserPopupname] = useState('userpopup hidden')
    const [user_popup_email,setUserPopupmail]= useState('userpopup hidden')
    const [user_popup_password,setUserPopuppassword]= useState('userpopup hidden')

    const [oldemail, setOldemail]=useState('');
    const [newemail, setNewemail]=useState('');
    

    const [oldusername, setOldusername]=useState('');
    const [newusername, setNewusername]=useState('');

    const [oldpassword, setOldpassword]=useState('');
    const [newpassword, setNewpassword]=useState('');
     
    function handleemail(e)
    {
       e.preventDefault();
        axios.put('http://localhost:3000/Profile', {oldemail,newemail})
       .then((response) =>
         {
       if (response.data.success) {
         alert(response.data.message);
         setOldemail('');
         setNewemail('');
    
       } 
       else
        {
         alert(response.data.message);
        }
         })
         .catch((error)=>{
          alert('Error changing data');
         });
 };

 function handleusername(e)
    {
       e.preventDefault();
        axios.put('http://localhost:3000/Profile', {oldusername,newusername})
       .then((response) =>
         {
       if (response.data.success) {
           alert(response.data.message);
           setOldusername('');
           setNewusername('');
    
       } 
       else
        {
         alert(response.data.message);
        }
         })
         .catch((error)=>{
          alert('Error changing data');
         });
 };

 function handlpassword(e)
    {
       e.preventDefault();
        axios.put('http://localhost:3000/Profile', {oldpassword,newpassword})
       .then((response) =>
         {
           if (response.data.success)
             {
               alert(response.data.message)
               setOldpassword('');
               setNewpassword('');
              } 
              else
              {
               alert(response.data.message);
              }
               })
               .catch((error)=>{
                alert('Error changing data');
               });
 };

  return (
    <div className='Edit'>
      <div className='edit-btns'>
      <button onClick={e=>{setUserPopupname('userpopup visible')}}>UserName Change</button>
      <button onClick={e=>{setUserPopupmail('userpopup visible')}}>Email Change</button>
      <button onClick={e=>{setUserPopuppassword('userpopup visible')}}>Password Change</button>
      </div>

      <div className={user_popup_name}>
        <h1>User Name Change</h1>
        <i  id='close' class="fa-regular fa-circle-xmark" onClick={e=>{setUserPopupname('userpopup hidden')}}></i>
        <input type="text" placeholder='enter your old username'  value={oldusername} onChange={e=>{setOldusername(e.target.value)}} />
        <input type="text" placeholder='enter your new user name'  value={newusername} onChange={e=>{setNewusername(e.target.value)}} />
        <button id='sub-btn' onClick={handleusername}>submit</button>

      </div>
      <div className={user_popup_email}>
        <h1>User Email Change</h1>
        <i  id='close' class="fa-regular fa-circle-xmark" onClick={e=>{setUserPopupmail('userpopup hidden')}}></i>
        <input type="text" placeholder='enter your old Email' value={oldemail} onChange={e=>{setOldemail(e.target.value)}} />
        <input type="text" placeholder='enter your new Email' value={newemail} onChange={e=>{setNewemail(e.target.value)}} />
        <button id='sub-btn' onClick={handleemail}>submit</button>

      </div>
      <div className={user_popup_password}>
        <h1>User Password Change</h1>
        <i  id='close' class="fa-regular fa-circle-xmark" onClick={e=>{setUserPopuppassword('userpopup hidden')}}></i>
        <input type="text" placeholder='enter your old Password' value={oldpassword} onChange={(e)=>{setOldpassword(e.target.value)}}/>
        <input type="text" placeholder='enter your new Password' value={newpassword} onChange={(e)=>{setNewpassword(e.target.value)}} />
        <button id='sub-btn' onClick={handlpassword}>submit</button>

      </div>
      
    </div>
  )
}
