import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banner from './Banner';

const ExistingCredit = () => {
  const [creditsList, setCreditsList] = useState([]);

  useEffect(() => {
    const storedCredit = localStorage.getItem('creditsList');
    if (storedCredit) {
      const parsedCredit = JSON.parse(storedCredit).map(credit => {
        const storedContribution = localStorage.getItem(`contribution-${credit.name}`);
        return {
          ...credit,
          showContributionInput: false,
          editMode: false,
          inputValue: '', 
          contribution: storedContribution ? parseFloat(storedContribution) : 0.00,
          notification: null,
        };
      });
      setCreditsList(parsedCredit)
    }
  }, []);

  const handleContributeClick = (index) => {
    const newCreditsList = creditsList.map((credit, i) => 
      i === index ? { ...credit, showContributionInput: true, editMode: false, notification: null } : credit
    );
    setCreditsList(newCreditsList);
  };

  const handleAddClick = (index) => {
    const newCreditsList = creditsList.map((credit, i) => {
      if (i === index) {
        const newContribution = parseFloat(credit.inputValue) || 0;
        if (newContribution + credit.contribution > credit.amount) {
          return { ...credit, notification: 'Your contribution amount exceeds your current balance.' };
        } else {
          const updatedContribution = credit.contribution + newContribution;
          localStorage.setItem(`contribution-${credit.name}`, updatedContribution);
          if (updatedContribution === credit.amount) {
            toast.success('Congratulations!🎉🎉🎉 All Payments Complete!');
          }
          return { 
            ...credit, 
            contribution: updatedContribution, 
            showContributionInput: false, 
            inputValue: '', 
            notification: null 
          };
        }
      }
      return credit;
    });
    setCreditsList(newCreditsList);
  };

  const handleInputChange = (index, value) => {
    const newCreditsList = creditsList.map((credit, i) => 
      i === index ? { ...credit, inputValue: value } : credit
    );
    setCreditsList(newCreditsList);
  };

  const handleEditClick = (index) => {
    const newCreditsList = creditsList.map((credit, i) => 
      i === index ? { ...credit, editMode: true, showContributionInput: false, notification: null } : credit
    );
    setCreditsList(newCreditsList);
  };

  const handleUpdateClick = (index) => {
    const newCreditsList = creditsList.map((credit, i) => {
      if (i === index) {
        const newContribution = parseFloat(credit.inputValue);
        if (newContribution > credit.amount) {
          return { ...credit, notification: 'Your contribution amount exceeds the current investment amount.' };
        } else {
          localStorage.setItem(`contribution-${credit.name}`, newContribution);
          if (newContribution === credit.amount) {
            toast.success('Congratulations!🎉🎉🎉 All Payments Complete!');
          }
          return { 
            ...credit, 
            contribution: newContribution, 
            editMode: false, 
            inputValue: '', 
            notification: null 
          };
        }
      }
      return credit;
    });
    setCreditsList(newCreditsList);
  };

  const handleCancelClick = (index) => {
    const newCreditsList = creditsList.map((credit, i) => {
      if (i === index) {
        if (credit.showContributionInput) {
          return { ...credit, showContributionInput: false, inputValue: '', notification: null };
        } else if (credit.editMode) {
          return { ...credit, editMode: false, inputValue: credit.contribution.toFixed(2), notification: null };
        }
      }
      return credit;
    });
    setCreditsList(newCreditsList);
  };

  const closeNotification = (index) => {
    const newCreditsList = creditsList.map((credit, i) => 
      i === index ? { ...credit, notification: null } : credit
    );
    setCreditsList(newCreditsList);
  };


  return (
    <div className='existing-data'>
      <ToastContainer />
      <ul>
        {creditsList.map((credit, index) => (
          <li key={index}>
            <div className='existing-data--name-amount'>
              <div className="existing-data-name">
                <strong>Name:</strong> {credit.name}
              </div>
              
              <div className="existing-data-amount">
                <strong> Amount:</strong> ${credit.amount}/
              </div>
            </div>

            <div className='contribution'>
              ${credit.contribution.toFixed(2)}
              {!credit.showContributionInput && !credit.editMode ? (
                <div className='contribute-btns-wrapper'>
                  <button className='contribute-btn' onClick={() => handleContributeClick(index)}>
                    Contribute
                  </button>
                  <button className='edit-btn' onClick={() => handleEditClick(index)}>
                    Edit
                  </button>
                </div>
              ) : credit.showContributionInput ? (
                <div className='contribution-amount'>
                  <input 
                    type='number'
                    step="0.01"
                    min="0.00"
                    max={credit.amount}
                    value={credit.inputValue} 
                    onChange={(e) => handleInputChange(index, e.target.value)} 
                    placeholder='$0.00'
                    required
                  />
                  <button className='contribute--add-btn' onClick={() => handleAddClick(index)}>
                    Add
                  </button>
                  <button className='cancel-btn' onClick={() => handleCancelClick(index)}>
                    Cancel
                  </button>
                </div>
              ) : credit.editMode && (
                <div className='edit-contribution'>
                  <input 
                    type='number'
                    step="0.01"
                    min="0.00"
                    max={credit.amount}
                    value={credit.inputValue} 
                    onChange={(e) => handleInputChange(index, e.target.value)} 
                    placeholder='$0.00'
                    required
                  />
                    <button className='edit--update-btn' onClick={() => handleUpdateClick(index)}>
                      Update
                    </button>
                    <button className='cancel-btn' onClick={() => handleCancelClick(index)}>
                      Cancel
                    </button>
                </div>
              )}
            </div>
            {credit.notification && <Banner message={credit.notification} onClose={() => closeNotification(index)} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExistingCredit;
