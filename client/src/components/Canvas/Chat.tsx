'use client';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from '@/services/socket';



export default function Chat({ name , room }: ChatIconProps) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [messageText, setMessageText] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(true);

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast.error('Message cannot be empty!', { position: 'top-right' });
      return;
    }

    const newMessage = {
      sender: name as string, 
      text: messageText.trim(),
    };

    socket.emit('sendMessage', { room, ...newMessage });
    setMessages((prev) => [...prev, newMessage]);
    setMessageText('');
  };

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      if (message && message.sender && message.text) {
          setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isChatOpen) {
    return null; 
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-2xl rounded-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-lg">
        <h2 className="text-lg font-semibold">Chat</h2>
        <button
          onClick={() => setIsChatOpen(false)}
          className="text-black text-lg hover:text-gray-700 transition duration-200"
        >
          ✖
        </button>
      </div>

    
      <div className="h-60 overflow-y-auto p-4 bg-gray-100">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`mb-3 ${msg.sender === name ? 'text-right' : 'text-left'}`}>
              <span
                className={`inline-block px-4 py-2 rounded-2xl shadow-md ${
                  msg.sender === name ? 'bg-blue-500 text-gray-800' : 'bg-gray-200 text-gray-800'
                }`}
              >
                <strong>{msg.sender}:</strong> {msg.text} 
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet. Start chatting!</p>
        )}
      </div>


      <div className="flex items-center p-2 bg-white border-t border-gray-300">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-500 text-sm"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white py-2 px-4 rounded-r-lg hover:bg-blue-600 transition duration-300 text-sm"
        >
          Send
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}
