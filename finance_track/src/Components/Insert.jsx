import axios from 'axios';
import React, { useState } from 'react'

export default function Insert() {

    const[cpopup,setCpopup]=useState('CreditsPopup hidden')
    const[dpopup,setDpopup]=useState('DebitsPopup hidden')
    const[lpopup,setLpopup]=useState('LimitPopup hidden')
    const[sdata,setSdata]=useState('');

    const[cdate,setCdate]=useState('');
    const[clabel,setClabel]=useState('');
    const[camount,setCamount]=useState('');

    const[ddate,setDdate]=useState('');
    const[dlabel,setDlabel]=useState('');
    const[damount,setDamount]=useState('');

    const[limit,setLimit]=useState('');
    const[dlimit,setDlimit]=useState('');


    const Creditsub = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/CreditAdd', { cdate, clabel, camount })
            .then((res) => {
                if(res.data.message)
                    { setSdata(res.data.message);}
                else
                     {
                        alert("data added sucsessfull");
                        setCdate('');
                        setClabel('');
                        setCamount('');
                     }

            })
            .catch((err) => {
                console.log(err);
                setSdata('Error submitting credit');
            });
    };

    const Debitsub = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/DebitAdd', { ddate, dlabel, damount })
            .then((res) => {
                if(res.data.message)
               { setSdata(res.data.message);}
                else
               { alert("data added sucsessfull")
                        setDdate('');
                        setDlabel('');
                        setDamount('');
               }
            })
            .catch((err) => {
                console.log(err);
                setSdata('Error submitting debit');
            });
    };

    const handleLimitSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/Set', { limit })
            .then((res) => {
                if (res.data.message) {
                    setDlimit(res.data.message);
                    setLimit('');
                    setDlimit('');
                }
            
            })
            .catch((err) => {
                console.log(err);
                setDlimit('Error setting ');
            });
    };

  return (
    <div className='Insert'>
        <div className='data-btn'>
        <button className='btn1' onClick={e=>{setCpopup('CreditsPopup visible');setDpopup('DebitsPopup hidden')}}>Credit's Insert</button><br />
        <button className='btn2' onClick={e=>{setDpopup('DebitsPopup visible');setCpopup('CreditsPopup hidden')}}>Debit's Insert</button><br />
        <button className='btn2' onClick={e=>{setLpopup("LimitPopup visible")}}>Set Limit</button>
        </div>
        <div className={cpopup}>
        <div className='CreditInsert LogIn'>
        <i  id='close ' class="fa-regular fa-circle-xmark" onClick={e=>{setCpopup('CreditsPopup hidden')}}></i>
            <label>Dtae(YYYY-MM-DD) <br /><input type="text" value={cdate} onChange={e=>{setCdate(e.target.value)}}/></label>
            <label>Label<br /><input type="text" value={clabel} onChange={e=>{setClabel(e.target.value)}}/></label>
            <label>Credit_Amount <br /><input type="text" value={camount} onChange={e=>{setCamount(e.target.value)}}/></label>
            <button onClick={Creditsub}>submit</button>
            <h2>{sdata}</h2>
           
        </div>
        </div>
        <div className={dpopup}>
        <div className='CreditInsert LogIn'>
        <i  id='close ' class="fa-regular fa-circle-xmark" onClick={e=>{setDpopup('DebitsPopup hidden')}}></i>
            <label>Dtae(YYYY-MM-DD) <br /><input type="text" value={ddate} onChange={e=>{setDdate(e.target.value)}} /></label>
            <label>Label<br /><input type="text" value={dlabel} onChange={e=>{setDlabel(e.target.value)}}/></label>
            <label>Debit_Amount <br /><input type="text" value={damount} onChange={e=>{setDamount(e.target.value)}}/></label>
            <button onClick={Debitsub}>submit</button>
            <h2>{sdata}</h2>
           
        </div>
        </div>

        <div className={lpopup}>
            <div className='limitdata'>
            <i  id='close ' class="fa-regular fa-circle-xmark" onClick={e=>{setLpopup('CreditsPopup hidden')}}></i>
                <h2>
                    You can Set limit on Debit's
                </h2>
                <input type='number' value={limit} onChange={e=>{setLimit(e.target.value)}} placeholder='Enter a limit' />

                <button onClick={handleLimitSubmit}>Set Limit</button>
                <p>{dlimit}</p>
            </div>
        </div>
    </div>
  )
}
