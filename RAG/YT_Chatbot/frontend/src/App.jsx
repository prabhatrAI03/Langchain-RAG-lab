import { useState } from 'react';
import Header from './components/Header';
import YouTubeInput from './components/YouTubeInput';
import FeatureSelector from './components/FeatureSelector';
import RequestInput from './components/RequestInput';
import GenerateButton from './components/GenerateButton';
import LoadingState from './components/LoadingState';
import ResponseCard from './components/ResponseCard';
import ErrorMessage from './components/ErrorMessage';
import { extractYouTubeVideoId } from './utils/youtube';
import { api } from './services/api';
import './App.css';

export default function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('summary');
  const [userInstruction, setUserInstruction] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [urlError, setUrlError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState(null);

  const handleUrlChange = (value) => {
    setYoutubeUrl(value);
    setUrlError(null);
    
    // Extract video ID and set thumbnail
    const videoId = value.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1] || 
                    (value.length === 11 ? value : null);
    if (videoId) {
      setVideoThumbnail(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
    } else {
      setVideoThumbnail(null);
    }
  };

  const handleGenerate = async () => {
    // Validate URL
    if (!youtubeUrl.trim()) {
      setUrlError('Please enter a YouTube URL');
      return;
    }

    const videoId = extractYouTubeVideoId(youtubeUrl);
    if (!videoId) {
      setUrlError(
        'Invalid YouTube URL. Please enter a valid URL like: https://www.youtube.com/watch?v=... or https://youtu.be/...'
      );
      return;
    }

    // Validate instruction
    if (!userInstruction.trim()) {
      setError('Please enter an instruction for what you want to do');
      return;
    }

    // Clear previous response and error
    setResponse(null);
    setError(null);
    setLoading(true);

    try {
      let result;

      if (selectedFeature === 'quiz') {
        result = await api.quiz(videoId, userInstruction);
      } else {
        result = await api.chat(videoId, userInstruction);
      }

      if (result.success) {
        setResponse(result.data.answer);
      } else {
        setError(result.error || 'An error occurred while processing your request');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateAgain = () => {
    setResponse(null);
    setError(null);
    handleGenerate();
  };

  const isFormValid = youtubeUrl.trim() && userInstruction.trim();
  const hasContent = youtubeUrl.trim() || response;

  return (
    <div className="app">
      <Header />

      <main className="main-container">
        <div className="content-wrapper">
          {/* Empty State */}
          {!hasContent && !response && (
            <div className="empty-state">
              <div className="empty-state-icon">✨</div>
              <h2>Your AI Workspace Is Ready</h2>
              <p>Paste a YouTube video and choose what you want to generate.</p>
            </div>
          )}

          {/* Input Form */}
          <section className={`input-section ${hasContent ? 'has-content' : ''}`}>
            <YouTubeInput
              value={youtubeUrl}
              onChange={handleUrlChange}
              error={urlError}
              thumbnail={videoThumbnail}
            />

            <FeatureSelector
              selected={selectedFeature}
              onSelect={setSelectedFeature}
            />

            <RequestInput
              value={userInstruction}
              onChange={setUserInstruction}
              feature={selectedFeature}
            />

            <GenerateButton
              onClick={handleGenerate}
              disabled={!isFormValid}
              loading={loading}
            />
          </section>

          {/* Loading State */}
          {loading && <LoadingState feature={selectedFeature} />}

          {/* Error Message */}
          {error && (
            <ErrorMessage
              message={error}
              onDismiss={() => setError(null)}
            />
          )}

          {/* Response */}
          {response && !loading && (
            <ResponseCard
              feature={selectedFeature}
              response={response}
              onCopy={handleCopy}
              onGenerateAgain={handleGenerateAgain}
            />
          )}

          {/* Copy Feedback */}
          {copied && (
            <div className="copy-feedback">
              ✅ Copied to clipboard!
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>🎥 YouTube AI Assistant • Powered by LangChain + Ollama</p>
      </footer>
    </div>
  );
}
