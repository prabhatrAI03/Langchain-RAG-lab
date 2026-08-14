import './RequestInput.css';

export default function RequestInput({ value, onChange, feature }) {
  const placeholders = {
    summary: 'Give me a concise summary with the most important concepts.',
    interview: 'Generate 10 technical interview questions with answers.',
    quiz: 'Generate 10 MCQs with four options and the correct answer.'
  };

  return (
    <div className="request-input-container">
      <label htmlFor="request-textarea" className="input-label">
        💬 Additional Instructions
      </label>
      <div className="textarea-wrapper">
        <textarea
          id="request-textarea"
          className="request-textarea"
          placeholder={placeholders[feature] || 'What would you like to do with this video?'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
        />
      </div>
    </div>
  );
}
