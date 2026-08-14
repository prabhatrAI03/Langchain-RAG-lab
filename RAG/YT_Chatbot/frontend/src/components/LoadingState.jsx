import { useState, useEffect } from 'react';
import './LoadingState.css';

export default function LoadingState({ feature }) {
  const messages = [
    '🤖 Analyzing video...',
    '📚 Processing transcript...',
    '🧠 Generating response...',
    '⏳ Almost there...'
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-state">
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-message">{messages[messageIndex]}</p>
      </div>
    </div>
  );
}
