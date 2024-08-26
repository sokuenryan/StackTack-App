import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AddNewBills from '../components/AddNewBills';
import Calendar from '../components/Calendar';

const Bills = () => {
  const [ActiveComponent, setActiveComponent] = useState('AddNewBills');
  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const [bills, setBills] = useState([]);

  useEffect(() => {
    const savedBills = JSON.parse(localStorage.getItem('bills')) || [];
    setBills(savedBills);
  }, []);

  const handleBillSubmit = (newBill) => {
    const updatedBills = [...bills, newBill];
    setBills(updatedBills);
    localStorage.setItem('bills', JSON.stringify(updatedBills));
  };

  const handleBillDelete = (index) => {
    const updatedBills = [...bills];
    updatedBills.splice(index, 1);
    setBills(updatedBills);
    localStorage.setItem('bills', JSON.stringify(updatedBills));
  };

  const handleBillEdit = (index, newName) => {
    const updatedBills = [...bills];
    updatedBills[index].name = newName;
    setBills(updatedBills);
    localStorage.setItem('bills', JSON.stringify(updatedBills));
  };

  return (
    <div className='bills content-setup'>
      <Sidebar />
      <div className='content'>
        <div className='tab-table'>
          <div className='tabs'>
            <div className='tab-btns'>
              <button onClick={() => handleButtonClick('AddNewBills')}>Create New Bills</button>
              <button onClick={() => handleButtonClick('Calendar')}>Calendar</button>
            </div>

            {ActiveComponent === 'AddNewBills' && (
              <AddNewBills
                onBillSubmit={handleBillSubmit}
                onBillEdit={handleBillEdit}
                onBillDelete={handleBillDelete}
                billsList={bills}
              />
            )}
            {ActiveComponent === 'Calendar' && (
              <Calendar bills={bills} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bills;