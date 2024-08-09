import React, { useState } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const Paichart = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  

  const data = {
    labels: ['Rent', 'Grocery', 'Travel', 'Shopping', 'Others'],
    datasets: [
      {
        label: '₹',
        data: [7200, 1800, 8350, 11150, 799],
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
  };

  const expenseDetails = {
    Grocery: [
      { item: 'Oil', amount: 300 },
      { item: 'Vegetables', amount: 500 },
      { item: 'Fruits', amount: 400 },
      { item: 'Dairy', amount: 600 },
    ],
    Rent: [
      { Rent :'Home', amount: 2700 },
      { Rent: 'Bike', amount: 1500 },
      { Rent: 'Cameras', amount: 700 },
      { Rent: 'Medical Equipments', amount: 2300 },
    ],
    Travel: [
      {Place:"Ooty",amount:1500},
      {Place:'Goa',amount:2350},
      {Place:'Kerala',amount:3200},
      {Place:'Wonderla',amount:1300}
    ],
    Shopping: [
      {Brand:'Zudio', amount:2500},
      {Brand:'Zara', amount:3400},
      {Brand:'Peter England',amount:5250}
    ],
    Others:[
      {Recharge:"Mobile",amount:799},
    ]
  };

  const handleChartClick = (elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const category = data.labels[index];
      if (expenseDetails[category]) {
        setSelectedCategory(category);
      } else {
        setSelectedCategory(null);
      }
    }
  };

  const getTableHeaders = () => {
    if (selectedCategory && expenseDetails[selectedCategory].length > 0) {
      return Object.keys(expenseDetails[selectedCategory][0]);
    }
    return [];
  };

  return (
    <div>
      <div className="chart-wrapper">
        <Doughnut
          data={data} 
          options={{
            onClick: (event, elements) => handleChartClick(elements)
          }}
        />
      </div>
      
      {selectedCategory && (
        <div className="details-table">
          <i  id='close' class="fa-regular fa-circle-xmark"  onClick={()=>setSelectedCategory(null)}></i>
          <h3>{selectedCategory} Details</h3>
          <table>
            <thead>
              <tr>
                {getTableHeaders().map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expenseDetails[selectedCategory].map((expense, index) => (
                <tr key={index}>
                  {getTableHeaders().map((header, headerIndex) => (
                    <td key={headerIndex}>{expense[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Paichart;
