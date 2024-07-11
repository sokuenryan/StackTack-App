import React, { useEffect, useState } from 'react';
import Sidebar from '../component/Sidebar';
import AddNewInvestments from '../component/AddNewInvestments';

const Investments = () => {
  const [ActiveComponent, setActiveComponent] = useState('AddNewInvestments');
  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const savedInvestments = JSON.parse(localStorage.getItem('investments')) || [];
    setInvestments(savedInvestments);  
  }, []);

  const handleInvestmentSubmit = (newInvestment) => {
    const updatedInvestments = [...bills, newInvestment];
    setInvestments(updatedInvestments);
    localStorage.setItem('investments', JSON.stringify(updatedInvestments));
  };

  const handleInvestmentDelete = (index) => {
    const updatedInvestments = [...investments];
    updatedInvestments.splice(index, 1);
    setInvestments(updatedInvestments);
    localStorage.setItem('investments', JSON.stringify(updatedInvestments));
  };

  const handleInvestmentEdit = (index, newName) => {
    const updatedInvestments = [...investments];
    updatedInvestments[index].name = newName;
    setInvestments(updatedInvestments);
    localStorage.setItem('investments', JSON.stringify(updatedInvestments)); 
  };

  return (
    <div className='investments setup'>
      <Sidebar />
      <div className='investments-content'>
        <div className='tab-table'>
          <div className='tabs'>
            <div className="tab-btns">
              <button>Create New Investment</button>
            </div>
            
            {ActiveComponent === 'AddNewInvestments' && (
              <AddNewInvestments
                onInvestmentSubmit={handleInvestmentSubmit}
                onInvestmentEdit={handleInvestmentEdit}
                onInvestmentDelete={handleInvestmentDelete}
                investmentsList={investments}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;