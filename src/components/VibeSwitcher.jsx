import React, { useState, useEffect } from 'react';

const VIBE_THEMES = {
  horror: {
    name: 'Horror',
    background: 'bg-gray-900',
    messageBackground: 'bg-red-950',
    headerBackground: 'bg-black',
    textColor: 'text-red-100',
    accentColor: 'text-red-500'
  },
  mystery: {
    name: 'Mystery',
    background: 'bg-slate-800',
    messageBackground: 'bg-slate-700',
    headerBackground: 'bg-slate-900',
    textColor: 'text-slate-100',
    accentColor: 'text-purple-400'
  },
  romance: {
    name: 'Romance',
    background: 'bg-pink-50',
    messageBackground: 'bg-pink-100',
    headerBackground: 'bg-pink-200',
    textColor: 'text-pink-900',
    accentColor: 'text-pink-600'
  },
  default: {
    name: 'Default',
    background: 'bg-gray-100',
    messageBackground: 'bg-gray-100',
    headerBackground: 'bg-white',
    textColor: 'text-gray-900',
    accentColor: 'text-blue-500'
  }
};

const VibeSwitcher = ({ isEditorMode, currentVibe, onVibeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleVibeSelect = (vibe) => {
    onVibeChange(vibe);
    setIsOpen(false);
    localStorage.setItem('imessage-vibe', vibe);
  };

  const currentTheme = VIBE_THEMES[currentVibe] || VIBE_THEMES.default;

  if (!isEditorMode) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
        Vibe: {currentTheme.name}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            {Object.entries(VIBE_THEMES).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleVibeSelect(key)}
                className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
                  currentVibe === key
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{theme.name}</span>
                  {currentVibe === key && (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { VibeSwitcher, VIBE_THEMES };
