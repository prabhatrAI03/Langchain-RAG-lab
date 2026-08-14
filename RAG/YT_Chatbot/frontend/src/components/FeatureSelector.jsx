import './FeatureSelector.css';

export default function FeatureSelector({ selected, onSelect }) {
  const features = [
    {
      id: 'summary',
      icon: '📝',
      title: 'Summary',
      description: 'Get key points & insights'
    },
    {
      id: 'interview',
      icon: '💼',
      title: 'Interview',
      description: 'Generate Q&A pairs'
    },
    {
      id: 'quiz',
      icon: '❓',
      title: 'Quiz',
      description: 'Create MCQ questions'
    }
  ];

  return (
    <div className="feature-selector-container">
      <label className="selector-label">Choose a feature:</label>
      <div className="features-grid">
        {features.map((feature) => (
          <button
            key={feature.id}
            className={`feature-card ${selected === feature.id ? 'active' : ''}`}
            onClick={() => onSelect(feature.id)}
          >
            <div className="feature-icon">{feature.icon}</div>
            <div className="feature-title">{feature.title}</div>
            <div className="feature-description">{feature.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
