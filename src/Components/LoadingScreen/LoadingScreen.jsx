// src/Components/LoadingScreen/LoadingScreen.jsx
import React from 'react';
import './LoadingScreen.css';

// We assume the fade-out logic from App.jsx is still managing the isFading prop
const LoadingScreen = ({ isFading }) => {
  return (
    <div className={`loading ${isFading ? 'fade-out' : ''}`}>
      <div className="loading-text">
        <span className="loading-text-words">L</span>
        <span className="loading-text-words">O</span>
        <span className="loading-text-words">A</span>
        <span className="loading-text-words">D</span>
        <span className="loading-text-words">I</span>
        <span className="loading-text-words">N</span>
        <span className="loading-text-words">G</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
