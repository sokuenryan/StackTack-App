import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const BillsCalendar = ({ billsList }) => {
  const [value, setValue] = useState(new Date());

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const billsForDay = billsList.filter(bill => {
        const billDate = new Date(bill.date);
        return (
          billDate.getFullYear() === date.getFullYear() &&
          billDate.getMonth() === date.getMonth() &&
          billDate.getDate() === date.getDate()
        );
      });

      return (
        <div className="bills-list">
          {billsForDay.map((bill, index) => (
            <div key={index} className="bill">
              {bill.name}: ${bill.amount}
            </div>
          ))}
        </div>
      );
    }
    return null;
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

export default BillsCalendar;