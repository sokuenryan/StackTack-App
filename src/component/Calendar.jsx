import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';

const BillCalendar = () => {
  const [billsList, setBillsList] = useState(() => {
    const savedBills = localStorage.getItem('billsList');
    return savedBills ? JSON.parse(savedBills) : [];
  });

  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const savedBills = localStorage.getItem('billsList');
    if (savedBills) {
      setBillsList(JSON.parse(savedBills));
    }
  }, []);

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const adjustedDate = new Date(date);
      adjustedDate.setDate(adjustedDate.getDate() - 1);
      
      const billsForDay = billsList.filter(bill => {
        const billDate = new Date(bill.date);
        return billDate.toDateString() === adjustedDate.toDateString();
      });

      return billsForDay.map((bill, index) => (
        <div key={index} className="bill">
          {bill.name}: ${bill.amount}
        </div>
      ));
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={setValue}
        value={value}
        tileContent={renderTileContent}
      />
    </div>
  );
};

export default BillCalendar;
