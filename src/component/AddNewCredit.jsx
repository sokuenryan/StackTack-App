import React, { useEffect, useState } from 'react';;

const AddNewCredit = () => {
    const [newCreditName, setNewCreditName] = useState('');
    const [newCreditAmount, setNewCreditAmount] = useState('');
    const [creditsList, setCreditsList] =useState(() => {
        const savedCredits = localStorage.getItem('creditsList');
        return savedCredits ? JSON.parse(savedCredits) : [];
    });
    const [editIndex, setEditIndex] = useState(null);
    const [editCreditName, setEditCreditName] = useState('');
    const [editCreditAmount, setEditCreditAmount] = useState('');

    useEffect(() => {
        localStorage.setItem('creditsList', JSON.stringify(creditsList));
    }, [creditsList]);

    const handleAddNewCredit = (onCreditSubmit) => {
        if (newCreditName && newCreditAmount) {
            const newCredit = {
                name: newCreditName,
                amount: parseFloat(newCreditAmount),
                paid: false,
            };
            setCreditsList([...creditsList, newCredit]);
            onCreditSubmit(newCredit);
            setNewCreditName('');
            setNewCreditAmount('');
        }
    };

    const handleEditCredit = (index, newName, newAmount) => {
        const updatedCredits = [...creditsList];
        updatedCredits[index] = {
            ...updatedCredits[index],
            name: newName,
            amount: parseFloat(newAmount),
        };
        setCreditsList(updatedCredits);
        setEditIndex(null);
    };

    const handleDeleteCredit = (index) => {
        const updatedCredits = [...creditsList];
        updatedCredits.splice(index, 1);
        setCreditsList(updatedCredits);
    };

    const togglePaid = (index) => {
        const updatedCredits = [...creditsList]
        updatedCredits[index].paid = !updatedCredits[index].paid;
        setCreditsList(updatedCredits);
    };

    const countPaidCredits = () => {
        return creditsList.filter(credit => credit.paid).length; 
    };

    const calculatePaidFraction = () => {
        const paidCreditsCount = creditsList.filter(credit => credit.paid).length;
        const totalCreditCount = creditsList.length;
        return `${paidCreditsCount}/${totalCreditCount}`;
    };

    const calculatePaidPercentage = () => {
        const paidCredits = creditsList.filter(investment => investment.paid);
        const totalCredits = creditsList.length;
            return totalCredits > 0 ? ((paidCredits.length / totalCredits) *100).toFixed(2) : 0.00;
    };

  return (
    <div className='add-new-credits-wrapper'>
        <div className='add-new-credits--create'>
            <tbody className='info-table'>
                <div className='info'>
                    <th>Amount Paid</th>
                    <tr>{calculatePaidFraction()}</tr>
                </div>

                <div className='info'>
                    <th>Payments Left</th>
                    <tr><p>{creditsList.length - countPaidCredits()}</p></tr>
                </div>

                <div className='info'>
                    <th>Progress</th>
                    <tr>{calculatePaidPercentage()}%</tr>
                </div>
            </tbody>

            <div className='add-new-credits'>
                <h1>Add New Credit </h1>
                <div className="submission-data">
                    <div className='submit--name-amount'>
                        <div className='submit-name'>
                            <label htmlFor='creditName'>Credit Name</label>
                            <input 
                                type='text'
                                placeholder='Enter Credit Name'
                                maxLength={25}
                                value={newCreditName}
                                onChange={(e) => setNewCreditName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='submit-amount'>
                            <label htmlFor='creditAmount'>Amount</label>
                            <input
                                type='number'
                                step="0.01"
                                inputMode='decimal'
                                name='creditAmount'
                                placeholder='0.00'
                                value={newCreditAmount}
                                onChange={(e) => setNewCreditAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button 
                    onClick={handleAddNewCredit}
                    style={{marginTop: '30px'}}>
                        Add Credit
                    </button>
                </div>
            </div>
        </div>

        <div className='list-items'>
                <h1>Credit List</h1>
                <ul>
                    {creditsList.map((credits, index) =>(
                       <li key={index}>
                        {editIndex === index ? (
                            <>
                                <input
                                    className='list-items--name'
                                    placeholder='New Credit Name'
                                    type='text'
                                    value={editCreditName}
                                    onChange={(e) => setEditCreditName(e.target.value)}
                                />
                                <input
                                    className='list-items--amount'
                                    type='number'
                                    step='0.01'
                                    placeholder='$0.00'
                                    inputMode='decimal'
                                    value={editCreditAmount}
                                    onChange={(e) => setEditCreditAmount(e.target.value)}
                                    required
                                />
                                <button className='save-btn' onClick={() => handleEditCredit(index, editCreditName, editCreditAmount)}>
                                    Save
                                </button>
                                <button className='cancel-btn' onClick={() => setEditIndex(null)}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <div className='list-items-info'>
                                    <span className='list-items-name-amount'>
                                        {credits.name} : ${credits.amount}
                                    </span>
                                </div>

                                <div className='list-items-modifiers'>
                                    <div className='list-items--checkbox'>
                                        <input
                                            type='checkbox'
                                            checked={credits.paid}
                                            onChange={() => togglePaid(index)}
                                        />
                                    </div>

                                    <div className="list-items--btns">
                                        <button className='edit-btn' onClick={() => setEditIndex(index)}>Edit</button>
                                        <button className='delete-btn' onClick={() => handleDeleteCredit(index)}>Delete</button>
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

export default AddNewCredit;