import './GenerateButton.css';

export default function GenerateButton({ onClick, disabled, loading }) {
  return (
    <button
      className={`generate-button ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Processing...
        </>
      ) : (
        <>
          🚀 Generate
        </>
      )}
    </button>
  );
}
