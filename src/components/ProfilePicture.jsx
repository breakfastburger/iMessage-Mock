import React, { useState, useRef } from 'react';

const ProfilePicture = ({ isEditorMode, onProfileChange }) => {
  const [imageUrl, setImageUrl] = useState(() => {
    return localStorage.getItem('imessage-profile-image') || null;
  });
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target.result;
        setImageUrl(url);
        localStorage.setItem('imessage-profile-image', url);
        onProfileChange?.(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    localStorage.removeItem('imessage-profile-image');
    onProfileChange?.(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (imageUrl) {
    return (
      <div className="relative group">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img 
            src={imageUrl} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        {isEditorMode && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <div className="flex gap-1">
              <button
                onClick={handleUploadClick}
                className="bg-white rounded-full p-1"
                title="Change photo"
              >
                <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button
                onClick={handleRemoveImage}
                className="bg-white rounded-full p-1"
                title="Remove photo"
              >
                <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className="relative group">
      <div 
        className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer"
        onClick={isEditorMode ? handleUploadClick : undefined}
      >
        <span className="text-white font-semibold text-lg">JD</span>
      </div>
      {isEditorMode && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePicture;
