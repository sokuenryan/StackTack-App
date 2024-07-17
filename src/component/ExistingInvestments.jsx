import React, { useState, useEffect } from 'react';
import Banner from './Banner';

const ExistingInvestments = () => {
  const [investmentsList, setInvestmentsList] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const storedInvestments = localStorage.getItem('investmentsList');
    if (storedInvestments) {
      setInvestmentsList(JSON.parse(storedInvestments).map(investment => ({
        ...investment,
        showContributionInput: false,
        editMode: false,
        inputValue: '',
        contribution: 0.00,
        notification: null,
      })));
    }
  }, []);

  const handleContributeClick = (index) => {
    const newInvestmentsList = investmentsList.map((investment, i) => 
      i === index ? { ...investment, showContributionInput: true, editMode: false, notification: null } : investment
    );
    setInvestmentsList(newInvestmentsList);
  };

  const handleAddClick = (index) => {
    const newInvestmentsList = investmentsList.map((investment, i) => {
      if (i === index) {
        const newContribution = parseFloat(investment.inputValue) || 0;
        if (newContribution + investment.contribution > investment.amount) {
          return { ...investment, notification: 'Your contribution amount exceeds the current investment amount.' };
        } else {
          return { 
            ...investment, 
            contribution: investment.contribution + newContribution, 
            showContributionInput: false, 
            inputValue: '', 
            notification: null 
          };
        }
      }
      return investment;
    });
    setInvestmentsList(newInvestmentsList);
  };

  const handleInputChange = (index, value) => {
    const newInvestmentsList = investmentsList.map((investment, i) => 
      i === index ? { ...investment, inputValue: value } : investment
    );
    setInvestmentsList(newInvestmentsList);
  };

  const handleEditClick = (index) => {
    const newInvestmentsList = investmentsList.map((investment, i) => 
      i === index ? { ...investment, editMode: true, showContributionInput: false, notification: null } : investment
    );
    setInvestmentsList(newInvestmentsList);
  };

  const handleUpdateClick = (index) => {
    const newInvestmentsList = investmentsList.map((investment, i) => {
      if (i === index) {
        const newContribution = parseFloat(investment.inputValue);
        if (newContribution > investment.amount) {
          return { ...investment, notification: 'Your contribution amount exceeds the current investment amount.' };
        } else {
          return { 
            ...investment, 
            contribution: newContribution, 
            editMode: false, 
            inputValue: '', 
            notification: null 
          };
        }
      }
      return investment;
    });
    setInvestmentsList(newInvestmentsList);
  };

  const closeNotification = (index) => {
    const newInvestmentsList = investmentsList.map((investment, i) => 
      i === index ? { ...investment, notification: null } : investment
    );
    setInvestmentsList(newInvestmentsList);
  };

  return (
    <div className='existing-investments'>
      <ul>
        {investmentsList.map((investment, index) => (
          <li key={index}>
            <div className='existing-investment--name-amount'>
              <div className="existing-investment-name">
                <strong>Name:</strong> {investment.name}
              </div>
              
              <div className="existing-investment-amount">
                <strong> Amount:</strong> ${investment.amount}/
              </div>
            </div>
            <div className='contribution'>
              ${investment.contribution.toFixed(2)}
              {!investment.showContributionInput && !investment.editMode ? (
                <div className='contribute-btns-wrapper'>
                  <button className='contribute-btn' onClick={() => handleContributeClick(index)}>
                    Contribute
                  </button>
                  <button className='edit-btn' onClick={() => handleEditClick(index)}>
                    Edit
                  </button>
                </div>
              ) : investment.showContributionInput ? (
                <div className='contribution-amount'>
                  <input 
                    type='number'
                    step="0.01"
                    min="0.00"
                    max={investment.amount}
                    value={investment.inputValue} 
                    onChange={(e) => handleInputChange(index, e.target.value)} 
                    placeholder='$0.00'
                  />
                  <button className='contribute--add-btn' onClick={() => handleAddClick(index)}>
                    Add
                  </button>
                </div>
              ) : investment.editMode && (
                <div className='edit-contribution'>
                  <input 
                    type='number'
                    step="0.01"
                    min="0.00"
                    max={investment.amount}
                    value={investment.inputValue} 
                    onChange={(e) => handleInputChange(index, e.target.value)} 
                    placeholder='$0.00'
                  />
                  <button className='edit--update-btn' onClick={() => handleUpdateClick(index)}>
                    Update
                  </button>
                </div>
              )}
            </div>
            {investment.notification && <Banner message={investment.notification} onClose={() => closeNotification(index)} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExistingInvestments;
