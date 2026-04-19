import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import Header from './Header';
import ChatInput from './ChatInput';
import { VibeSwitcher, VIBE_THEMES } from './VibeSwitcher';

const ChatScreen = () => {
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [currentVibe, setCurrentVibe] = useState(() => {
    return localStorage.getItem('imessage-vibe') || 'default';
  });
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('imessage-messages');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        text: "Hey! Did you hear what happened at the old house on Elm Street?",
        sender: "other",
        timestamp: "10:23 PM",
        isTyping: false
      },
      {
        id: 2,
        text: "No, what happened? I drove past there earlier and everything seemed normal...",
        sender: "self",
        timestamp: "10:24 PM",
        isTyping: false
      },
      {
        id: 3,
        text: "That's the weird part. The lights were flickering on and off, and I swear I saw someone standing in the upstairs window...",
        sender: "other",
        timestamp: "10:25 PM",
        isTyping: false
      }
    ];
  });
  
  const [isTyping, setIsTyping] = useState(false);
  const [draggedMessage, setDraggedMessage] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('imessage-messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('imessage-vibe', currentVibe);
  }, [currentVibe]);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text: text,
      sender: "self",
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      isTyping: false
    };
    setMessages([...messages, newMessage]);
  };

  const updateMessage = (id, newText, newSender) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, text: newText, sender: newSender } : msg
    ));
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const addNewMessage = () => {
    const newMessage = {
      id: Date.now(),
      text: "New message",
      sender: "other",
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      isTyping: false
    };
    setMessages([...messages, newMessage]);
  };

  const handleDragStart = (e, message) => {
    setDraggedMessage(message);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetMessage) => {
    e.preventDefault();
    if (!draggedMessage || draggedMessage.id === targetMessage.id) return;

    const draggedIndex = messages.findIndex(msg => msg.id === draggedMessage.id);
    const targetIndex = messages.findIndex(msg => msg.id === targetMessage.id);
    
    const newMessages = [...messages];
    newMessages.splice(draggedIndex, 1);
    newMessages.splice(targetIndex, 0, draggedMessage);
    
    setMessages(newMessages);
    setDraggedMessage(null);
  };

  return (
    <div className="flex flex-col h-screen bg-black max-w-md mx-auto relative">
      {/* iPhone Status Bar */}
      <div className="bg-black text-white px-6 py-2 flex justify-between items-center text-xs font-medium">
        <span>{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-3 border border-white rounded-sm">
            <div className="w-3 h-2 bg-white rounded-sm m-0.5"></div>
          </div>
          <div className="w-1 h-2 bg-white rounded-sm"></div>
          <div className="w-1 h-2 bg-white rounded-sm"></div>
          <div className="w-1 h-2 bg-white rounded-sm"></div>
        </div>
      </div>

      {/* Editor Mode Toggle */}
      <div className="bg-gray-900 px-4 py-2 flex justify-between items-center border-b border-gray-700">
        <span className="text-white text-sm font-medium">
          {isEditorMode ? 'Editor Mode' : 'Preview Mode'}
        </span>
        <button
          onClick={() => setIsEditorMode(!isEditorMode)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            isEditorMode 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          {isEditorMode ? 'Switch to Preview' : 'Switch to Editor'}
        </button>
      </div>

      {/* Editor Controls */}
      {isEditorMode && (
        <div className="bg-gray-800 px-4 py-2 flex gap-2 border-b border-gray-700">
          <button
            onClick={addNewMessage}
            className="px-3 py-1 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 transition-colors"
          >
            + Add Message
          </button>
          <span className="text-gray-400 text-xs flex items-center">
            Drag messages to reorder
          </span>
          <VibeSwitcher
            isEditorMode={isEditorMode}
            currentVibe={currentVibe}
            onVibeChange={setCurrentVibe}
          />
        </div>
      )}

      {/* Chat Header */}
      <Header isEditorMode={isEditorMode} />

      {/* Messages Area */}
      <div className={`flex-1 overflow-y-auto px-4 py-2 ${VIBE_THEMES[currentVibe]?.messageBackground || 'bg-gray-100'}`}>
        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              draggable={isEditorMode}
              onDragStart={(e) => handleDragStart(e, message)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, message)}
              className={isEditorMode ? 'cursor-move' : ''}
            >
              <MessageBubble 
                message={message} 
                isEditorMode={isEditorMode}
                onUpdate={updateMessage}
                onDelete={deleteMessage}
              />
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-2">
              <div className="bg-gray-200 rounded-2xl rounded-tl-none px-4 py-2 max-w-[70%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatScreen;
