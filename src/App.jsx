import React from 'react';
import ChatScreen from './components/ChatScreen';
import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md">
        <ChatScreen />
      </div>
    </div>
  );
}

export default App;
