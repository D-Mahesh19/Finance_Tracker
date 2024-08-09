import React from 'react'

export default function Help() {
  return (
    <div className='Help'>
      <img src="https://support.udemy.com/hc/theming_assets/01HZP8FNK17KDMAEG0N5FYC050" alt="" />
      <div className='content'>
        <h2>How May we Help You?</h2>
        <input type="text" placeholder='Search for solution' />
      </div>
      <h2 id='head'>Frequently Asked Questions</h2>
     <div className="frequently-1">
      
      <div className='Q1'>
        <h2>How's your service Best</h2>
        <div><p>ans : We have Experienced Workes , <br />and from the last year we are   <br /> only one top fianace supporter</p></div>
      </div>
      <div className="Q3">
        <h2>What is SAP accounting software?</h2>
        <div><p>ans :SAP accounting software is a financial accounting <br />and reporting software that records transactions, </p></div>
      </div>
      
      <div className="Q3">
        <h2>Payment Methods</h2>
        <div><p>ans :we can pay through online <br />transaction  or Cash also.</p></div>
      </div>
     </div>
     <div className="frequently-2">
     <div className='Q1'>
      <br />
        <h2>Working days </h2>
        <div><p>ans :We have 5 Working day's in a week,<br /> With the timeings of 9AM to 6PM  </p></div>
      </div>
      <div className="Q2">
        <h2> Which is better – SAP or Tally?</h2>
        <div><p>ans :  Each solution has its own characteristics and <br /> primary user segments. While Tally is ideally suited <br />for startups and MSMEs, SAP is popular among huge <br />corporates and MNCs.</p></div>
      </div>
      <div className="Q2">
        <h2>How can i connect you</h2>
        <div><p>ans : In this website we have contact <br />section , we connect throug this.</p></div>
      </div>
     </div>

      </div>
  )
}
