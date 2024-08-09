import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
ChartJS.register(ArcElement, Tooltip, Legend);



const Paichart1 = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Debit Amount',
         data: [],
        backgroundColor: [
          '#4CB140',
          '#003737',
          '#EF9234',
          '#6A6E73',
          '#C9190B',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3000/api/debits')
      .then((response) => {
        const fetchedData = response.data;
        const labels = fetchedData.map((item) => item.Debit_Label);
        const amounts = fetchedData.map((item) => item.Debit_Amount); 
        setChartData({
          ...chartData,
          labels: labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: amounts,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  const navigate=useNavigate();

  const handleCheck=(e)=>{
    navigate('/Debits')
  }
  
  return (
    <div>
      <div className="chart-wrapper">
        <Doughnut
          data={chartData}
         onClick={handleCheck}
        />
      </div>
    </div>
  );
};

export default Paichart1;
