import React, { useState } from 'react';

const AddNewBills = () => {
  const [newBillName, setNewBillName] = useState('');
  const [newBillDate, setNewBillDate] = useState('');
  const [newBillAmount, setNewBillAmount] = useState('');
  const [editBillName, setEditBillName] = useState('');
  const [editBillDate, setEditBillDate] = useState('');
  const [editBillAmount, setEditBillAmount] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [billsList, setBillsList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

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

  const handleEditClick = (index) => {
    setEditIndex(index);
    const bill = billsList[index];
    setEditBillName(bill.name);
    setEditBillDate(bill.date);
    setEditBillAmount(bill.amount.toString()); // Convert amount to string for editing
    setSelectedWeek(bill.week); // Set selectedWeek for editing
  };

  const handleEditBill = (index, newName, newDate, newAmount) => {
    const updatedBills = [...billsList];
    updatedBills[index].name = newName;
    updatedBills[index].date = newDate;
    updatedBills[index].amount = parseFloat(newAmount); // Parse amount back to float
    updatedBills[index].week = selectedWeek; // Update week in edited bill
    setBillsList(updatedBills);
    setEditIndex(null);
  };

  const handleDeleteBill = (index) => {
    const updatedBills = [...billsList];
    updatedBills.splice(index, 1);
    setBillsList(updatedBills);
  };

  return (
    <div className='add-new-bills'>
      <h1>Add New Bill</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddNewBill();
        }}
      >
        <div className='submission-data'>
          <div className='bill--name-amount'>
            <div className='bill-name'>
              <label htmlFor='billName'>Bill Name</label>
              <input
                type='text'
                placeholder='Enter bill name...'
                maxLength={25}
                value={newBillName}
                onChange={(e) => setNewBillName(e.target.value)}
                required
              />
            </div>

            <div className='bill-amount'>
              <label htmlFor='billAmount'>Amount</label>
              <input
                type='number'
                step='0.01'
                inputMode='decimal'
                name='billAmount'
                id='billAmount'
                placeholder='$0.00'
                value={newBillAmount}
                onChange={(e) => setNewBillAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='bill--week-datedue'>
            <div className='bill-week'>
              <label htmlFor="weekSelect">Select Week:</label>
              <select 
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
            </div>
            <div className='bill-date'>
              <label htmlFor='billDueDate'>Date Due</label>
              <input
                type='date'
                max='9999-12-31'
                value={newBillDate}
                onChange={(e) => setNewBillDate(e.target.value)}
                required
              />
            </div>
          </div>

          <button type='submit'>Submit</button>
        </div>
      </form>

      <div className='recent-bills'>
        <h1>Recent Bills</h1>
        <ul>
          {billsList.map((bill, index) => (
            <li key={index}>
              {editIndex === index ? (
                <>
                  <input
                    type='text'
                    value={editBillName}
                    onChange={(e) => setEditBillName(e.target.value)}
                  />
                  <input
                    type='number'
                    step='0.01'
                    placeholder='$0.00'
                    inputMode='decimal'
                    value={editBillAmount}
                    onChange={(e) => setEditBillAmount(e.target.value)}
                    required
                  />
                  <input
                    type='date'
                    value={editBillDate}
                    onChange={(e) => setEditBillDate(e.target.value)}
                  />
                  <select 
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
                </>
              ) : (
                <>
                  <div className='recent-bills--info-wrapper'>
                    <span className='info 1'>{bill.name} - Amount: ${bill.amount.toFixed(2)}</span>
                    <span className='info 2'>{bill.week} - {dateDue(bill.date)}</span>
                  </div>
                  <div className='recent-bills--btns'>
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                    <button onClick={() => handleDeleteBill(index)}>Delete</button>
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
