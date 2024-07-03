import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const BillCalendar = ({ bills }) => {
  const [value, setValue] = useState(new Date());

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const billsForDay = bills.filter(bill => new Date(bill.date).toDateString() === date.toDateString());
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
