import './ErrorMessage.css';

export default function ErrorMessage({ message, onDismiss }) {
  return (
    <div className="error-message">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <div className="error-text">
          <p className="error-title">Error</p>
          <p className="error-detail">{message}</p>
        </div>
      </div>
      {onDismiss && (
        <button className="error-dismiss" onClick={onDismiss}>
          ✕
        </button>
      )}
    </div>
  );
}
