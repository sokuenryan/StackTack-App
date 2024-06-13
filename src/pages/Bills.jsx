// react imports
import React, { useState, useEffect } from 'react';

// components
import Sidebar from '../component/Sidebar';
import AddNewBills from '../component/AddNewBills';

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
    <div className='bills setup'>
      <Sidebar />
      <div className='bills-wrapper'>
        <div className='bills-content'>
          <table className='bill-table'>
            <tbody>
              <tr>
                <th>Bills Paid</th>
                {/* your data for 'Bills Paid' here */}
              </tr>

              <tr>
                <th>Bills Left</th>
                  {/* your data for 'Bills Left' goes here */}
              </tr>

              <tr>
                <th>Percent Paid</th>
                {/* Your data for 'Bills Left' goes here */}
              </tr>
            </tbody>
          </table>

          <div className='bill_tab_table'>
            <div className='tabs'>
              <div className='tab_btns'>
                <button onClick={() => handleButtonClick('AddNewBills')}>Create New Bills</button>
                <button onClick={() => handleButtonClick('Calendar')}>Calendar</button>
              </div>

              {ActiveComponent === 'AddNewBills' && (
              <AddNewBills
                onBillSubmit={handleBillSubmit}
                onBillDelete={handleBillDelete}
                onBillEdit={handleBillEdit}
                bills={bills}
              />
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bills;