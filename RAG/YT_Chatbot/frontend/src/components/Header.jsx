import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">
          🎥 YouTube AI Assistant
        </h1>
        <p className="header-subtitle">
          Turn YouTube videos into summaries, interview questions and quizzes
        </p>
      </div>
    </header>
  );
}
