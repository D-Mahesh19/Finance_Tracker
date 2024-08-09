import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Credits() {
    const [credits, setCredits] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/Credits')
            .then((res) => {
                setCredits(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='Credits-table'>
            <div className='data-btn'>
                <button className='btn1'><Link to='/Credits' className='link-cbtn'>Credit's Overview</Link></button>
                <button className='btn2'><Link to='/Debits' className='link-cbtn'>Debit's Overview</Link></button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Label</th>
                        <th>Credited_Amount</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {credits.map((credit) => (
                        <tr >
                            <td>{credit.Credit_Date}</td>
                            <td>{credit.Credit_Label}</td>
                            <td>{credit.Credit_Amount}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
