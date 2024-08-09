import React, { useEffect, useState } from 'react'
// import Paichart from './Paichart'
import Paichart1 from './Paichart1'
import axios from 'axios'



import { Form, Link } from 'react-router-dom'


export default function Layout() {


  const [TotalDebits,setTotalDebits]=useState('');
  const[TotalCredits,settotalCredits]=useState('');
  const[Balance,setBalance]=useState('')
  const[limit,setLimit]=useState('');
   useEffect(()=>{
    axios.get('http://localhost:3000/TotalDebit')
    .then((res)=>{
     
        // console.log(res.data[0].TotalDebits)
        setTotalDebits(res.data[0].TotalDebits);
    
    })
    .catch((error)=>{console.log(error);})
   },[]);

   useEffect(()=>{
    axios.get('http://localhost:3000/TotalCredits').then((res)=>{
      settotalCredits(res.data[0].TotalCredits)
    }).catch((error)=>console.log(error))
   },[])

   useEffect(()=>{
    setBalance(TotalCredits - TotalDebits)
   },[TotalCredits, TotalDebits])



    const downloadCSV = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Layout', {
          responseType: 'blob',
        });
  
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('There was an error downloading the CSV!', error);
      }
    };
  
    useEffect(() => {
      axios.get('http://localhost:3000/SetData')
        .then((response) => {
          setLimit(response.data); 
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    
    const handleLimit = () => {
      
      if (TotalDebits > limit.Limit_Amount) {
        
        return "Debits is more than Limit Amount";
      }
      return '';
    };

  return (
    <div className='layout'>
      <div className='icons'>
      <div className='icons-left'>
      <i class="fa-solid fa-bars" ></i>
      <div className='menu-bar'>
      <button className='btnm1'><Link to='/Credits' className='link-cbtn'> Overview</Link></button>
      <button className='btnm1'><Link to='/Profile' className='link-cbtn'> Profile Edit</Link></button>
      <button className='btnm1'><Link to='/Insert' className='link-cbtn'> Insert Data</Link></button>
      <button className='btnm1'><Link to='/Trends' className='link-cbtn'> Trends</Link></button>
     
      </div>
      </div>
      <div className='icons-right'>
        <div className='fa ico'>
      <i class="fa-solid fa-circle-user"></i>
      <div className='user'>
      <button className='btnm1'><Link to='/LogIn' className='link-cbtn'>Log out</Link></button>
      <button className='btnm1'><Link to='/Help' className='link-cbtn'>Help</Link></button>
      <button className='btnm1'><Link to='/Contact' className='link-cbtn'>Contact Us</Link></button>
      </div>
      </div>
      <div className='fa fb'>
      <button onClick={downloadCSV}><i class="fa-solid fa-circle-arrow-down"></i></button>
      </div>
      </div>
      </div>
      <div className="layout-img">
        <img src="https://w7.pngwing.com/pngs/859/489/png-transparent-logo-accountant-accounting-consultant-design-text-service-logo.png" alt="" />
      </div>
        <div className='layout-data'>
        <div className='credit data'>
            <p>Credit's <br /> <i class="fa-solid fa-indian-rupee-sign"> {TotalCredits}</i></p>
            </div>
            <div className='debit data'>
            <p>Debit's <br /> <i class="fa-solid fa-indian-rupee-sign">{TotalDebits}</i></p>
           
            </div>
          
            <div className='balance data'>
            <p>Balance <br /> <i class="fa-solid fa-indian-rupee-sign"> {Balance}</i></p>
            </div>  
        </div>
        <p className='lim'>{handleLimit()}</p>
        <div className='paichart'>
      
       <Paichart1 /> 
       
        </div>
        

    </div>
  )
}
