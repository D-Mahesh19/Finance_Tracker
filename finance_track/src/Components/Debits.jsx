import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Debits() {

    const [debit,setDebit]=useState([]);

    useEffect(()=>{

        axios.get('http://localhost:3000/Debits')
        .then((res)=>{
            setDebit(res.data);
        }).catch((error)=>{console.log(error);})
    },[])

  return (
    <div className='Debits-table'>
        <div className='data-btn'>
        <button className='btn1'><Link to='/Credits' className='link-cbtn'>Credit's Overview</Link></button>
        <button className='btn2'><Link to='/Debits' className='link-cbtn'>Debit's Overview</Link></button>
        </div>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Label</th>
                <th>Debited_Amount </th>
               
            </tr>
            </thead>
            <tbody>
               {debit.map((debits)=>{
                return <tr>
                    <td>{debits.Debit_Date}</td>
                    <td>{debits.Debit_Label}</td>
                    <td>{debits.Debit_Amount}</td>
                    
                </tr>
               })
               }
            </tbody>
            

        
    </table>
</div>
  )
}
