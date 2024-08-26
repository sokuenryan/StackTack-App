import React from 'react';

const NotificationBanner = ({ message, onClose }) => {
  return (
    <div className="notification-banner">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default NotificationBanner;
