import React, { useState, useEffect } from 'react';
import Sidebar from '../component/Sidebar';
import AddNewBills from '../component/AddNewBills';
import BillsCalendar from '../component/BillsCalendar';
import BillInfo from '../component/BillInfo';

const Bills = () => {
  const [activeComponent, setActiveComponent] = useState('AddNewBills');
  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const [billsList, setBills] = useState([]);

  useEffect(() => {
    try {
      const savedBills = JSON.parse(localStorage.getItem('billsList')) || [];
      setBills(savedBills);
    } catch (error) {
      console.error('Error parsing bills from localStorage:', error);
      setBills([]);
    }
  }, []);

  const handleBillSubmit = (newBill) => {
    const updatedBills = [...billsList, newBill];
    setBills(updatedBills);
    localStorage.setItem('billsList', JSON.stringify(updatedBills));
  };

  const handleBillDelete = (index) => {
    const updatedBills = [...billsList];
    updatedBills.splice(index, 1);
    setBills(updatedBills);
    localStorage.setItem('billsList', JSON.stringify(updatedBills));
  };

  const handleBillEdit = (index, updatedBill) => {
    const updatedBills = [...billsList];
    updatedBills[index] = updatedBill;
    setBills(updatedBills);
    localStorage.setItem('billsList', JSON.stringify(updatedBills));
  };

  return (
    <div className='bills setup'>
      <Sidebar />
      <div className='bills-content'>
        <div className='bill_tab_table'>
          <div className='tabs'>
            <div className='tab_btns'>
              <button onClick={() => handleButtonClick('AddNewBills')}>Create New Bills</button>
              <button onClick={() => handleButtonClick('BillsCalendar')}>Calendar</button>
            </div>
            {activeComponent === 'AddNewBills' && (
              <AddNewBills
                onBillSubmit={handleBillSubmit}
                onBillDelete={handleBillDelete}
                onBillEdit={handleBillEdit}
                billsList={billsList}
              />
            )}
            {activeComponent === 'BillsCalendar' && (
              <BillsCalendar billsList={billsList} BillInfoComponent={BillInfo} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bills;
