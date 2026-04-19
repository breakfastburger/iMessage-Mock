import React, { useState } from 'react';

const MessageBubble = ({ message, isEditorMode, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.text);
  const [editSender, setEditSender] = useState(message.sender);
  const isSelf = message.sender === 'self';

  const handleSave = () => {
    onUpdate(message.id, editText, editSender);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(message.text);
    setEditSender(message.sender);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(message.id);
  };

  if (isEditorMode && isEditing) {
    return (
      <div className={`flex ${editSender === 'self' ? 'justify-end' : 'justify-start'} mb-2`}>
        <div className={`max-w-[70%] ${editSender === 'self' ? 'order-2' : 'order-1'}`}>
          <div className="bg-white border-2 border-blue-500 rounded-2xl p-3">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full bg-transparent text-black resize-none outline-none text-base mb-2"
              rows={3}
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif'
              }}
            />
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center text-xs">
                <input
                  type="checkbox"
                  checked={editSender === 'self'}
                  onChange={(e) => setEditSender(e.target.checked ? 'self' : 'other')}
                  className="mr-2"
                />
                <span>Sent (Blue)</span>
              </label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-blue-500 text-white rounded text-xs font-medium"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-500 text-white rounded text-xs font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`flex ${isSelf ? 'justify-end' : 'justify-start'} mb-2 ${isEditorMode ? 'group cursor-pointer' : ''}`}
      onClick={() => isEditorMode && setIsEditing(true)}
    >
      <div className={`max-w-[70%] ${isSelf ? 'order-2' : 'order-1'} relative`}>
        {isEditorMode && (
          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-blue-500 text-white rounded-full p-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
        )}
        <div
          className={`
            px-4 py-2 rounded-2xl text-base transition-colors
            ${isSelf 
              ? 'bg-blue-500 text-white rounded-tr-none' 
              : 'bg-gray-200 text-black rounded-tl-none'
            }
            ${isEditorMode ? 'hover:opacity-80' : ''}
          `}
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif'
          }}
        >
          <p className="break-words">{message.text}</p>
        </div>
        <div className={`px-2 pt-1 ${isSelf ? 'text-right' : 'text-left'}`}>
          <span className="text-xs text-gray-500 font-medium">
            {message.timestamp}
          </span>
          {isSelf && (
            <span className="text-xs text-gray-500 ml-1">
              {message.read ? 'Read' : 'Delivered'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
