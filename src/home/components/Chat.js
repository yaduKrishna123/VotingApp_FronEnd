import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import './chat.css'; 
import Headers from '../Headers';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const nav=useNavigate()
  const socket = socketIOClient('http://localhost:4000');

  useEffect(() => {
    if(!localStorage.getItem("token")){
      alert("login required")
      nav('/login')
    }

    const handleChatMessage = (message) => {
      // Update the messages state with the new message
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('chatMessage', handleChatMessage);

    return () => {
      // Remove the event listener when the component unmounts
      socket.off('chatMessage', handleChatMessage);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('chatMessage', message);
      setMessage('');
    }
  };

  return (
    <div>
      <Headers/>
   <div className="container">
    <div className="row">
      <div className="col-lg-4">
        <img src="https://img.freepik.com/premium-vector/chat-vector-icon_676179-133.jpg" alt="" className="img1" />
      </div>
      <div className="col-lg-8 w-100">
      <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <p key={index} className="message">{msg}</p>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>  
      </div>
    </div>
   </div>
   </div>
  );
};

export default Chat;
