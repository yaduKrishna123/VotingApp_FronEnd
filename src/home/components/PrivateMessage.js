import React, { useState } from 'react';
import './PrivateMessage.css'; // Import your CSS file for styling
import socketIOClient from 'socket.io-client';

const PrivateMessage = () => {
  const [recipientUserId, setRecipientUserId] = useState('');
  const [message, setMessage] = useState('');
  const socket = socketIOClient('http://localhost:4000'); // Replace with your server URL

  const handleSendMessage = () => {
    if (recipientUserId && message) {
      // Send the private message to the server
      socket.emit('privateMessage', { recipient: recipientUserId, message });
      setMessage('');
    }
  };

  return (
    <div className="private-message-container">
      <h2>Send a Private Message</h2>
      <div className="recipient-select">
        <select value={recipientUserId} onChange={(e) => setRecipientUserId(e.target.value)}>
          <option value="">Select a recipient user</option>
          <option value="654a66895fe225923a6d5ce1">User 1</option>
          <option value="2">User 2</option>
          {/* Add more user options as needed */}
        </select>
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="send-button">
        <button onClick={handleSendMessage}>Send Private Message</button>
      </div>
    </div>
  );
};

export default PrivateMessage;
