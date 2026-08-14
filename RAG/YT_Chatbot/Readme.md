# YouTube RAG Chatbot 🎥🤖

A modern Retrieval-Augmented Generation (RAG) chatbot that turns YouTube videos into summaries, interview questions, and quizzes.

## 🎯 Features

- **📝 Summaries**: Get key points and insights from any YouTube video
- **💼 Interview Questions**: Generate interview Q&A pairs from video content
- **❓ Quizzes**: Create multiple-choice questions with answers
- **🎬 YouTube Integration**: Works with any public YouTube video
- **🧠 AI-Powered**: Uses LangChain + Ollama for smart responses
- **🔍 RAG Pipeline**: Semantic search with FAISS vector database
- **🎨 Modern UI**: Beautiful React frontend with glassmorphism design
- **📱 Responsive**: Works on desktop, tablet, and mobile devices

## 🏗️ Architecture

```
React Frontend (Port 80)
        ↓
   FastAPI Backend (Port 8000)
        ↓
   RAG Pipeline
        ↓
   Ollama LLM + Chroma Vector DB
```

### Technology Stack

**Frontend**:
- React 18 with Vite
- Modern CSS with glassmorphism effects
- Responsive design

**Backend**:
- FastAPI
- LangChain for RAG
- Ollama for local LLM
- Chroma for vector embeddings
- YouTube transcript extraction

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- OR: Node.js 18+ (for frontend development)
- OR: Python 3.9+ (for backend development)

### Option 1: Docker Compose (Recommended)

```bash
cd YT_Chatbot
docker-compose up --build
```

Then open your browser to:
- **Frontend**: `http://localhost`
- **Backend API**: `http://localhost:8000/docs`

### Option 2: Local Development

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
python main.py
```

Backend runs on `http://localhost:8000`

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📖 Usage

1. **Enter YouTube URL**:
   - Full URL: `https://www.youtube.com/watch?v=...`
   - Short URL: `https://youtu.be/...`
   - With timestamp: `https://www.youtube.com/watch?v=...&t=120s`

2. **Select Feature**:
   - 📝 Summary
   - 💼 Interview
   - ❓ Quiz

3. **Add Instructions** (optional but recommended):
   - For Summary: "Give me key concepts"
   - For Interview: "10 technical questions with answers"
   - For Quiz: "10 MCQs with 4 options each"

4. **Click Generate** and wait for the response

## 📁 Project Structure

```
YT_Chatbot/
├── docker-compose.yml        # Container orchestration
├── Readme.md                 # This file
├── lesson.ipynb              # Jupyter notebook with examples
│
├── backend/                  # FastAPI server
│   ├── main.py              # API endpoints
│   ├── ytchatbot.py         # RAG pipeline logic
│   ├── requirements.txt
│   ├── Dockerfile
│   └── services/
│       ├── summary.py       # Summary generation
│       ├── interview.py     # Interview generation
│       └── quiz.py          # Quiz generation
│
└── frontend/                 # React application
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── services/        # API client
    │   ├── utils/          # Helper functions
    │   ├── App.jsx         # Main component
    │   └── index.css       # Global styles
    ├── package.json
    ├── vite.config.js
    ├── Dockerfile
    ├── nginx.conf
    └── README.md
```

## 🔌 API Endpoints

### POST /chat
Handles Summary and Interview generation.

**Request**:
```json
{
  "video_url": "VIDEO_ID",
  "question": "User instruction"
}
```

**Response**:
```json
{
  "answer": "Generated response"
}
```

### POST /quiz
Generates quiz questions.

**Request**:
```json
{
  "video_url": "VIDEO_ID",
  "question": "Quiz instructions"
}
```

**Response**:
```json
{
  "answer": "Generated quiz"
}
```

## 🎨 Frontend Features

### Components

- **Header**: Title and description
- **YouTubeInput**: URL input with validation
- **FeatureSelector**: Three attractive feature cards
- **RequestInput**: Instructions textarea with smart placeholders
- **GenerateButton**: Large CTA with loading state
- **LoadingState**: Animated loading indicators
- **ResponseCard**: Beautiful response display with markdown rendering
- **ErrorMessage**: User-friendly error notifications

### Design Highlights

- **Glassmorphism**: Frosted glass effect on cards
- **Gradient Backgrounds**: Blue, purple, and cyan accents
- **Smooth Animations**: Elegant transitions and hover effects
- **Dark Theme**: Reduces eye strain, modern aesthetic
- **Responsive Layout**: Adapts to all screen sizes
- **Accessibility**: Proper semantic HTML and ARIA labels

## 🔄 How It Works

### Frontend → Backend Flow

1. User enters YouTube URL
2. Frontend validates and extracts video ID (11-character code)
3. User selects feature (Summary/Interview/Quiz)
4. Frontend sends request with:
   - `video_url`: Extracted video ID (not full URL)
   - `question`: User instructions
5. Backend receives request
6. Backend performs intent detection (if `/chat`)
7. Backend executes RAG pipeline:
   - Download YouTube transcript
   - Split into chunks
   - Create embeddings
   - Semantic search for relevant chunks
   - Generate response with LLM
8. Response returned to frontend
9. Frontend renders with markdown support

## 🐛 Error Handling

The application handles:
- Invalid YouTube URLs
- Network connectivity issues
- Backend unavailable
- Invalid API responses
- Processing timeouts (5 minutes)
- Backend errors (400, 422, 500)

All errors display friendly messages to users.

## 🔧 Configuration

### Environment Variables

**Frontend** (`.env`):
```env
VITE_API_BASE_URL=http://localhost:8000
```

For production, use your backend domain:
```env
VITE_API_BASE_URL=https://your-backend.com
```

**Backend** (see `backend/requirements.txt`):
- Ollama service running on localhost:11434
- Chroma vector database (local)
- YouTube-Transcript-API for transcript extraction

## 📚 API Documentation

Once running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🧪 Testing

### Manual Tests

1. **Summary Feature**:
   - Enter URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Instruction: "Summarize this video"
   - Expected: Concise summary

2. **Interview Feature**:
   - Same video
   - Instruction: "Generate 5 interview questions"
   - Expected: Q&A pairs

3. **Quiz Feature**:
   - Same video
   - Instruction: "Generate 3 quiz questions"
   - Expected: MCQs with answers

### URL Validation Tests

The frontend accepts:
- ✅ `https://www.youtube.com/watch?v=S8kBjxHsatU`
- ✅ `https://www.youtube.com/watch?v=S8kBjxHsatU&t=120s`
- ✅ `https://youtu.be/S8kBjxHsatU`
- ✅ Direct ID: `S8kBjxHsatU`
- ❌ Invalid URLs show clear error

## 🚀 Deployment

### Docker Compose

```bash
docker-compose up --build
```

Containers:
- `yt_backend`: FastAPI server (port 8000)
- `yt_frontend`: React app via Nginx (port 80)

### Production Build

Frontend:
```bash
cd frontend
npm run build
# Creates optimized dist/ folder
```

Backend:
- Already production-ready in Docker
- Runs as service in docker-compose

## 📝 Development

### Adding Features

1. **Frontend Components**:
   - Create in `frontend/src/components/`
   - Import in `App.jsx`
   - Style with CSS modules

2. **Backend Services**:
   - Add to `backend/services/`
   - Create prompt in respective file
   - Call from `main.py`

### Debugging

**Frontend**:
```bash
cd frontend
npm run dev
# Check browser console for errors
```

**Backend**:
```bash
cd backend
python main.py
# Check terminal for error logs
```

## ⚠️ Important Notes

- **Backend expects VIDEO_ID only**, not full URLs
- Frontend automatically extracts VIDEO_ID before sending
- Do not send full YouTube URLs to the backend
- Ollama must be running for backend to work
- 5-minute timeout for all requests
- Timeouts are normal for long videos

## 🤝 Contributing

When modifying the project:

1. **Don't break backend API contract** - Keep endpoints compatible
2. **Keep frontend/backend separated** - No duplicated logic
3. **Maintain responsive design** - Test on mobile
4. **Update documentation** - Keep README current
5. **Test all three features** - Summary, Interview, Quiz

## 📦 Dependencies

See:
- `frontend/package.json` - React dependencies
- `backend/requirements.txt` - Python dependencies

## 📄 License

Your project license here

## ✅ Checklist Before Going Live

- [ ] Frontend loads without errors
- [ ] All three features work (Summary/Interview/Quiz)
- [ ] Error handling works properly
- [ ] Responsive design on mobile
- [ ] Docker Compose builds and runs
- [ ] Backend is unreachable - shows friendly error
- [ ] YouTube URL validation works
- [ ] Copy button works
- [ ] Generate Again works
- [ ] Loading states display correctly

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [LangChain Documentation](https://langchain.readthedocs.io/)
- [Ollama Documentation](https://github.com/ollama/ollama)
- [Chroma Documentation](https://docs.trychroma.com/)

## 💬 Support

For issues or questions:
1. Check the README in relevant folder
2. Review API documentation at `/docs`
3. Check error messages in console
4. Verify backend is running
5. Check Docker logs: `docker-compose logs`

---

**Built with ❤️ using LangChain, Ollama, and React**
