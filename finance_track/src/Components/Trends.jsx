import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function DailyDataGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/daily-data')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  return (
    <div className='line-data'>
      <h2>Daily Credit and Debit Amounts</h2>
      <LineChart className='line'
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total_credit" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="total_debit" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
