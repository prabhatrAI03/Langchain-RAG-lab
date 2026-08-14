import Markdown from 'react-markdown';
import './ResponseCard.css';

export default function ResponseCard({ feature, response, onCopy, onGenerateAgain }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    onCopy();
  };

  const getFeatureIcon = () => {
    switch (feature) {
      case 'summary':
        return '📝';
      case 'interview':
        return '💼';
      case 'quiz':
        return '❓';
      default:
        return '📄';
    }
  };

  const getFeatureTitle = () => {
    switch (feature) {
      case 'summary':
        return 'Summary';
      case 'interview':
        return 'Interview Questions';
      case 'quiz':
        return 'Quiz';
      default:
        return 'Response';
    }
  };

  return (
    <div className="response-card">
      <div className="response-header">
        <h2 className="response-title">
          {getFeatureIcon()} {getFeatureTitle()}
        </h2>
      </div>

      <div className="response-content">
        <Markdown className="response-markdown">
          {response}
        </Markdown>
      </div>

      <div className="response-actions">
        <button
          className="action-button copy-button"
          onClick={copyToClipboard}
          title="Copy to clipboard"
        >
          📋 Copy
        </button>
        <button
          className="action-button regenerate-button"
          onClick={onGenerateAgain}
          title="Generate again"
        >
          🔄 Generate Again
        </button>
      </div>
    </div>
  );
}
