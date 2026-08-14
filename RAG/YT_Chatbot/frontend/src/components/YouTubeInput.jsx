import { useState } from 'react';
import './YouTubeInput.css';

export default function YouTubeInput({ value, onChange, error, thumbnail }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="youtube-input-container">
      <label htmlFor="youtube-url" className="input-label">
        🎬 YouTube Video
      </label>
      <div className={`youtube-card ${focused ? 'focused' : ''} ${error ? 'error' : ''} ${thumbnail ? 'has-thumbnail' : ''}`}>
        <div className="input-wrapper-inner">
          <input
            id="youtube-url"
            type="text"
            className="youtube-input"
            placeholder="Paste YouTube URL here..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {thumbnail && (
            <div className="video-detected">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 3L6 11L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Video detected
            </div>
          )}
        </div>
        {thumbnail && (
          <div className="thumbnail-preview">
            <img src={thumbnail} alt="Video thumbnail" />
            <div className="thumbnail-overlay">▶</div>
          </div>
        )}
      </div>
      {error && <div className="input-error">{error}</div>}
    </div>
  );
}
