import React, { useState, useEffect } from 'react';

const AddNewBills = () => {
  const [newBillName, setNewBillName] = useState('');
  const [newBillDate, setNewBillDate] = useState('');
  const [newBillAmount, setNewBillAmount] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [billsList, setBillsList] = useState(() => {
    const savedBills = localStorage.getItem('billsList');
    return savedBills ? JSON.parse(savedBills) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editBillName, setEditBillName] = useState('');
  const [editBillDate, setEditBillDate] = useState('');
  const [editBillAmount, setEditBillAmount] = useState('');

  useEffect(() => {
    localStorage.setItem('billsList', JSON.stringify(billsList));
  }, [billsList]);

  const handleAddNewBill = () => {
    if (newBillName && newBillDate && selectedWeek && newBillAmount) {
      const newBill = {
        name: newBillName,
        date: newBillDate,
        week: selectedWeek,
        amount: parseFloat(newBillAmount),
        paid: false,
      };
      setBillsList([...billsList, newBill]);
      setNewBillName('');
      setNewBillDate('');
      setNewBillAmount('');
      setSelectedWeek('');
    }
  };

  const dateDue = (date) => {
    const [year, month, day] = date.split('-');
    const yearFormatter = year.length === 4 ? year : year.slice(0, 4);
    return `${month}/${day}/${yearFormatter}`;
  };

  const handleEditBill = (index, newName, newDate, newAmount) => {
    const updatedBills = [...billsList];
    updatedBills[index] = {
      ...updatedBills[index],
      name: newName,
      date: newDate,
      amount: parseFloat(newAmount),
    };
    setBillsList(updatedBills);
    setEditIndex(null);
  };

  const handleDeleteBill = (index) => {
    const updatedBills = [...billsList];
    updatedBills.splice(index, 1);
    setBillsList(updatedBills);
  };

  const togglePaid = (index) => {
    const updatedBills = [...billsList];
    updatedBills[index].paid = !updatedBills[index].paid;
    setBillsList(updatedBills);
  };

  const countPaidBills = () => {
    return billsList.filter(bill => bill.paid).length;
  };

  const calculatePaidFraction = () => {
    const paidBillsCount = billsList.filter(bill => bill.paid).length;
    const totalBillsCount = billsList.length;
    return `${paidBillsCount}/${totalBillsCount}`;
  };

  const calculatePaidPercentage = () => {
    const paidBills = billsList.filter(bill => bill.paid);
    const totalBills = billsList.length;
    return totalBills > 0 ? ((paidBills.length / totalBills) * 100).toFixed(2) : 0.00;
  };

  return (
    <div className="add-new-bills-wrapper">
      <div className="add-new-bills--create">
        <tbody className='bill-table'>
          <div className='bill-info'>
            <th>Bills Paid</th>
            <tr>{calculatePaidFraction()}</tr>
          </div>

          <div className='bill-info'>
            <th>Bills Left</th>
            <tr><p>{billsList.length - countPaidBills()}</p></tr>
          </div>

          <div className='bill-info'>
            <th>Progress Made</th>
            <tr>{calculatePaidPercentage()}%</tr>
          </div>
        </tbody>

        <div className='add-new-bills'>
          <h1>Add New Bill</h1>
          <div className="submission-data">
            <div className="bill--name-amount">
              <div className="bill-name">
                <label htmlFor='billName'>Bill Name</label>
                <input
                type="text"
                placeholder="Enter Bill Name"
                maxLength={25}
                value={newBillName}
                onChange={(e) => setNewBillName(e.target.value)}
                required
                />
              </div>
              <div className="bill-amount">
                <label htmlFor='billAmount'>Amount</label>
                <input
                  type="number"
                  step="0.01"
                  inputMode='decimal'
                  name='billAmount'
                  placeholder='$0.00'
                  value={newBillAmount}
                  onChange={(e) => setNewBillAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="bill--week-datedue">
              <div className="bill-week">
                <label htmlFor='billWeek'>Week of Bill</label>
                <select value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)}>
                  <option value="">Select Week</option>
                  <option value="Week 1">Week 1</option>
                  <option value="Week 2">Week 2</option>
                  <option value="Week 3">Week 3</option>
                  <option value="Week 4">Week 4</option>
                </select>
              </div>

              <div className="bill-date">
              <label htmlFor='billDate'>Bill Date</label>
                <input
                  type="date"
                  max='9999-12-31'
                  value={newBillDate}
                  onChange={(e) => setNewBillDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <button onClick={handleAddNewBill}>Add Bill</button>
          </div>
        </div>
      </div>

      <div className="bill-list">
          <h1>Bill List</h1>
          <ul>
          {billsList.map((bill, index) => (
            <li key={index}>
              {editIndex === index ? (
                <>
                  <input
                    className='bill-list--name'
                    placeholder='New Bill Name'
                    type="text"
                    value={editBillName}
                    onChange={(e) => setEditBillName(e.target.value)}
                  />
                  <input
                    className='bill-list--amount'
                    type="number"
                    step="0.01"
                    placeholder="$0.00"
                    inputMode='decimal'
                    value={editBillAmount}
                    onChange={(e) => setEditBillAmount(e.target.value)}
                    required
                  />
                  <input
                    className='bill-list--date'
                    type="date"
                    value={editBillDate}
                    onChange={(e) => setEditBillDate(e.target.value)}
                  />
                    <select 
                      className='bill-list--week-select'
                      id="weekSelect" 
                      value={selectedWeek} 
                      onChange={(e) => setSelectedWeek(e.target.value)} 
                      required
                    >
                      <option value="">Select a week</option>
                      <option value="Week 1">Week 1</option>
                      <option value="Week 2">Week 2</option>
                      <option value="Week 3">Week 3</option>
                      <option value="Week 4">Week 4</option>
                    </select>
                    <button className='save-btn' onClick={() => handleEditBill(index, editBillName, editBillDate, editBillAmount)}>
                      Save
                    </button>
                    <button className='cancel-btn' onClick={() => setEditIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <div className='bill-list-info'>
                    <span className='bill-list--name-amount'>
                      {bill.name}: ${bill.amount}
                    </span>
                   
                    <span className='bill-list--week-datedue'>
                      {bill.week} - {dateDue(bill.date)}
                    </span>
                  </div>
                  
                  <div className='bill-list-modifiers'>
                    <div className='bill-list--checkbox'>
                      <input
                        type="checkbox"
                        checked={bill.paid}
                        onChange={() => togglePaid(index)}
                      />
                    </div>
                  
                    <div className="bill-list--btns">
                      <button className='edit-btn' onClick={() => setEditIndex(index)}>Edit</button>
                      <button className='delete-btn' onClick={() => handleDeleteBill(index)}>Delete</button>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
          </ul>
      </div>
    </div>
  );
};

export default AddNewBills;
