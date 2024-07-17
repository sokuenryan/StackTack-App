import React, { useState, useEffect } from 'react';

const ExistingCredit = () => {
  const [creditsList, setCreditsList] = useState([]);

  useEffect(() => {
    const storedCredit = localStorage.getItem('creditsList');
    if (storedCredit) {
      setCreditsList(JSON.parse(storedCredit));
    }
  }, []);

  return (
    <div className='existing-credits'>
      <ul>
        {creditsList.map((credit, index) => (
          <li key={index}>
            <strong>Name:</strong> {credit.name}, 
            <strong> Amount:</strong> {credit.amount}, 
            <strong> Completed:</strong> {credit.paid ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExistingCredit;
