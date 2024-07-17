import React, { useState } from 'react';

const Contributions = () => {
  const [amount, setAmount] = useState(''); // State to keep track of input value
  const [contributions, setContributions] = useState([]); // State to store list of contributions
  const [showInput, setShowInput] = useState(false); // State to toggle showing input and add button

  const handleContributeClick = () => {
    setShowInput(true); // Show the input and add button
  };

  const handleAddClick = () => {
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid contribution amount.');
      return;
    }

    // Logic for adding the contribution
    const contribution = parseFloat(amount);
    const newContributions = [...contributions, contribution];
    setContributions(newContributions);

    // Reset input value
    setAmount('');

    // Hide input and add button after adding contribution
    setShowInput(false);
  };

  const handleCancelClick = () => {
    // Reset input value and hide input and add button
    setAmount('');
    setShowInput(false);
  };

  return (
    <div className='contribution'>
      <div className='contributions-list'>
        <ul>
          {contributions.map((contribution, index) => (
            <li key={index}>${contribution.toFixed(2)}</li>
          ))}
        </ul>
      </div>
      {!showInput && (
        <button onClick={handleContributeClick}>Contribute</button>
      )}
      {showInput && (
        <div className='input-container'>
          <input
            type='number'
            step='0.01'
            placeholder='$0.00'
            inputMode='decimal'
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className='button-container'>
            <button onClick={handleAddClick}>Add</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contributions;
