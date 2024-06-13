import React, { useState } from 'react';

export default function AddNewBills({}) {
  const [newBillName, setNewBillName] = useState('');
  const [newBillDate, setNewBillDate] = useState('');
  const [editBillName, setEditBillName] = useState('');
  const [editBillDate, setEditBillDate] = useState('');
  const [billsList, setBillsList] = useState([]);
  const [editIndex, setEditIndex] = useState(null); 

  const handleAddNewBill = () => {
    if (newBillName && newBillDate) {
      const newBill = {
        name: newBillName,
        date: (newBillDate),
        paid: false, 
      };
      setBillsList([...billsList, newBill]);
      setNewBillName('');
      setNewBillDate('');
      // Update JSON data file here
    }
  };

  const dateDue = (date) => {
    const [year, month, day] = date.split('-');
      return `${month}/${day}/${year}`;
  };

  const handleDeleteBill = (index) => {
    const updatedBills = [...billsList];
    updatedBills.splice(index, 1);
    setBillsList(updatedBills);
    // Update JSON data file here
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    const bill = billsList[index];
    setEditBillName(bill.name);
    setEditBillDate(bill.date);
  };

  const handleEditBill = (index, newName, newDate) => {
    const updatedBills = [...billsList];
    updatedBills[index].name = newName;
    updatedBills[index].date = (newDate);
    setBillsList(updatedBills);
    setEditIndex(null);
    // Update JSON data file here
  };

  return (
    <div className='add-new-bills'>
      <h1>Add New Bill</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleAddNewBill();
      }}>
        <input
          type="text"
          placeholder="Enter bill name..."
          maxLength={40}
          value={newBillName}
          onChange={(e) => setNewBillName(e.target.value)}
        />
        <input
          type="date"
          value={newBillDate}
          onChange={(e) => setNewBillDate(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      
      <div className='list-of-bills'>
        <h1>Bill List</h1>
        <ul>
          {billsList.map((bill, index) => (
            <li key={index}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editBillName}
                    onChange={(e) => setEditBillName(e.target.value)}
                  />
                  <input
                    type="date"
                    value={editBillDate}
                    onChange={(e) => setEditBillDate(e.target.value)}
                  />
                  <button onClick={() => handleEditBill(index, editBillName, editBillDate)}>Save</button>
                </>
              ) : (
                <>
                  <span>{bill.name} - {dateDue(bill.date)}</span>
                  <div className='bill-list-btns'>
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
}
