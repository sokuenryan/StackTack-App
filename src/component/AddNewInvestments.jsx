import React, { useEffect, useState } from 'react';

const AddNewInvestments = () => {
    const [newInvestmentName, setNewInvestmentName] = useState('');
    const [newInvestmentAmount, setNewInvestmentAmount] = useState('');
    
    const [investmentsList, setInvestmentsList] = useState(() => {
        const savedInvestments = localStorage.getItem('investmentsList');
        return savedInvestments ? JSON.parse(savedInvestments) : [];
    });

    const [editIndex, setEditIndex] = useState(null);
    const [editInvestmentName, setEditInvestmentName] = useState('');
    const [editInvestmentAmount, setEditInvestmentAmount] = useState('');

    // Storage //
    useEffect(() => {
        localStorage.setItem('investmentsList', JSON.stringify(investmentsList));
    }, [investmentsList]);

    // CRUD //
    const  handleAddNewInvestment = () => {
        if (newInvestmentName && newInvestmentAmount) {
            const newInvestment = {
                name: newInvestmentName,
                amount: parseFloat(newInvestmentAmount),
                paid: false,
            };
            setInvestmentsList([...investmentsList, newInvestment]);
            setNewInvestmentName('');
            setNewInvestmentAmount('');
        }
    };

    const handleEditInvestment = (index, newName, newAmount) => {
        const updatedInvestments = [...investmentsList];
        updatedInvestments[index] = {
            ...updatedInvestments[index],
            name: newName,
            amount: parseFloat(newAmount),
        };
        setInvestmentsList(updatedInvestments);
        setEditIndex(null);
    };

    const handleDeleteInvestment = (index) => {
        const investmentToDelete = investmentsList[index];
        localStorage.removeItem(`contribution-${investmentToDelete.name}`);
        
        const updatedInvestments = [...investmentsList];
        updatedInvestments.splice(index, 1);
        setInvestmentsList(updatedInvestments);
      };

    // checkbox //
    const togglePaid = (index) => {
        const updatedInvestments = [...investmentsList]
        updatedInvestments[index].paid = !updatedInvestments[index].paid;
        setInvestmentsList(updatedInvestments);
    };

    // sidebar //
    const countPaidInvestments = () => {
        return investmentsList.filter(investment => investment.paid).length; 
    };

    const calculatePaidFraction = () => {
        const paidInvestmentsCount = investmentsList.filter(investment => investment.paid).length;
        const totalInvestmentCount = investmentsList.length;
            return `${paidInvestmentsCount}/${totalInvestmentCount}`;
    };

    const calculatePaidPercentage = () => {
        const paidInvestments = investmentsList.filter(investment => investment.paid);
        const totalInvestments = investmentsList.length;
            return totalInvestments > 0 ? ((paidInvestments.length / totalInvestments) *100).toFixed(2) : 0.00;
    };

  return (
    <div className='content-wrapper'>
        <div className='content--create'>
            <table>
                <tbody className="progress">
                    <tr>
                        <th>Completed</th>
                        <td>{calculatePaidFraction()}</td>
                    </tr>

                    <tr>
                        <th>Active</th>
                        <td>{investmentsList.length - countPaidInvestments()}</td>
                    </tr>

                    <tr>
                        <th>Progress</th>
                        <td>{calculatePaidPercentage()}%</td>
                    </tr>
                </tbody>
            </table>

            <div className="content">
                <h1>Add New Investment</h1>
                <div className="submission-data">
                    <div className='submit--name-amount'>
                        <div className='submit-name'>
                            <label htmlFor='investmentName'>Investment Name</label>
                            <input
                                type='text'
                                placeholder='Enter Investment Name'
                                maxLength={25}
                                value={newInvestmentName}
                                onChange={(e) => setNewInvestmentName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='submit-amount'>
                            <label htmlFor='investmentAmount'>Amount</label>
                            <input
                                type='number'
                                step='0.01'
                                min='0'
                                max='999'
                                inputMode='decimal'
                                name='investmentAmount'
                                placeholder='0.00'
                                value={newInvestmentAmount}
                                onChange={(e) => setNewInvestmentAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button 
                        className='btn'
                        onClick={handleAddNewInvestment}
                        >
                        Submit
                    </button>
                </div>
            </div>
        </div>
            
        <div className='list-items'>
            <h1>Investment List</h1>
            <ul>
                {investmentsList.map((investments, index) =>(
                    <li key={index}>
                        {editIndex === index ? (
                            <>
                                <input
                                    className='list-items--name'
                                    placeholder='New Investment Name'
                                    type='text'
                                    value={editInvestmentName}
                                    onChange={(e) => setEditInvestmentName(e.target.value)}
                                />
                                <input
                                    className='list-items--amount'
                                    type='number'
                                    step='0.01'
                                    placeholder='$0.00'
                                    inputMode='decimal'
                                    value={editInvestmentAmount}
                                    onChange={(e) => setEditInvestmentAmount(e.target.value)}
                                    required
                                />
                                <button className='save-btn' onClick={() => handleEditInvestment(index, editInvestmentName, editInvestmentAmount)}>
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
                                        {investments.name} : ${investments.amount}
                                    </span>
                                </div>

                                <div className='list-items-modifiers'>
                                    <div className='list-items--checkbox'>
                                        <input
                                            type='checkbox'
                                            checked={investments.paid}
                                            onChange={() => togglePaid(index)}
                                        />
                                    </div>

                                    <div className="list-items--btns">
                                        <button className='edit-btn' onClick={() => setEditIndex(index)}>Edit</button>
                                        <button className='delete-btn' onClick={() => handleDeleteInvestment(index)}>Delete</button>
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

export default AddNewInvestments;