# YouTube AI Assistant - React Frontend

A modern, responsive React frontend for the YouTube RAG Chatbot. Built with React 18, Vite, and features a beautiful glassmorphism UI design.

## 🎯 Features

- **🎥 YouTube Video Input**: Enter full YouTube URLs, automatically extracts video ID
- **📝 Summary Generation**: Get concise summaries of video content
- **💼 Interview Mode**: Generate interview questions and answers
- **❓ Quiz Mode**: Create multiple-choice quizzes
- **⚡ Real-time Loading States**: Beautiful animated loading indicators
- **🎨 Modern Design**: Glassmorphism UI with gradient backgrounds
- **📱 Fully Responsive**: Works on desktop, tablet, and mobile
- **🔄 Error Handling**: Friendly error messages and fallback UI
- **📋 Copy to Clipboard**: Easily copy generated responses
- **🔧 Environment Configuration**: Flexible API URL configuration

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── YouTubeInput.jsx
│   │   ├── YouTubeInput.css
│   │   ├── FeatureSelector.jsx
│   │   ├── FeatureSelector.css
│   │   ├── RequestInput.jsx
│   │   ├── RequestInput.css
│   │   ├── GenerateButton.jsx
│   │   ├── GenerateButton.css
│   │   ├── LoadingState.jsx
│   │   ├── LoadingState.css
│   │   ├── ResponseCard.jsx
│   │   ├── ResponseCard.css
│   │   ├── ErrorMessage.jsx
│   │   └── ErrorMessage.css
│   ├── services/
│   │   └── api.js          # API client for backend communication
│   ├── utils/
│   │   └── youtube.js      # YouTube URL parsing utilities
│   ├── App.jsx             # Main app component
│   ├── App.css
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables (local dev)
├── .env.example            # Environment template
├── Dockerfile              # Production Docker build
├── nginx.conf              # Nginx configuration
└── README.md               # This file
```

## 🚀 Quick Start

### Option 1: Local Development (Requires Node.js 18+)

1. **Install Node.js 18+ and npm** from https://nodejs.org/

2. **Set up environment**:
   ```bash
   cd frontend
   cp .env.example .env
   ```

3. **Update `.env` if needed** (defaults to localhost:8000):
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

   Server will be available at `http://localhost:5173`

6. **Build for production**:
   ```bash
   npm run build
   # Output: dist/
   ```

### Option 2: Docker (Recommended for Production)

1. **Ensure Docker and Docker Compose are installed**

2. **Build and run with Docker Compose**:
   ```bash
   cd /path/to/YT_Chatbot
   docker-compose up --build
   ```

   - Backend: `http://localhost:8000`
   - Frontend: `http://localhost:80`

3. **Access the application**: Open `http://localhost` in your browser

### Option 3: Docker Standalone

Build the React app only:
```bash
cd frontend
docker build -t yt-assistant-frontend:latest .
docker run -p 80:3000 yt-assistant-frontend:latest
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# FastAPI backend URL
VITE_API_BASE_URL=http://localhost:8000
```

For Docker deployments, set the backend service name:
```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🎨 Features & Usage

### YouTube URL Input
- Accepts full YouTube URLs:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://www.youtube.com/watch?v=VIDEO_ID&t=120s` (with timestamp)
  - `https://youtu.be/VIDEO_ID`
  - Direct VIDEO_ID (11 characters)

### Feature Selection
- **Summary**: Creates concise summaries with key points
- **Interview**: Generates interview questions and answers
- **Quiz**: Creates multiple-choice questions

### Request Instructions
- Add custom instructions for each mode
- Default placeholders provided
- Full control over output format and content

### Response Handling
- Markdown rendering for formatted output
- Copy button to clipboard
- Generate Again to repeat with same inputs
- Automatic error handling and recovery

## 🐛 Error Handling

The frontend gracefully handles:

- ❌ Invalid YouTube URLs - Shows clear error message
- ❌ Network errors - Displays backend connection status
- ❌ Backend errors (400, 422, 500) - Shows user-friendly error message
- ❌ Missing inputs - Validation before submission
- ⏱️ Timeouts - 5-minute timeout with error notification

## 📱 Responsive Design

- **Desktop**: Full layout with optimized spacing
- **Tablet**: Adjusted component sizes and spacing
- **Mobile**: Single-column layout, touch-friendly buttons

## 🔐 API Communication

The frontend communicates with the FastAPI backend:

### POST /chat
**Request**:
```json
{
  "video_url": "VIDEO_ID_ONLY",
  "question": "User instruction text"
}
```

**Response**:
```json
{
  "answer": "Generated response with markdown"
}
```

### POST /quiz
Same request format as /chat, but routes to quiz generation.

## 📦 Dependencies

- **React 18.2.0** - UI framework
- **Vite 5.0.0** - Build tool
- **Axios 1.6.0** - HTTP client
- **react-markdown 9.0.1** - Markdown rendering
- **react-icons 5.0.0** - Icon library

## 🧪 Testing

The frontend works with the existing FastAPI backend. No backend modifications needed.

### Manual Testing

1. Start both frontend and backend services
2. Enter a valid YouTube URL
3. Select a feature (Summary/Interview/Quiz)
4. Add instructions
5. Click "Generate"
6. Verify response displays correctly

## 🎨 Design System

- **Colors**:
  - Primary: Purple (#8b5cf6)
  - Secondary: Cyan (#06b6d4)
  - Accent: Pink (#ec4899)
  - Background: Dark gradient (#0f0f1e to #1a0f2e)

- **Typography**:
  - Font: System fonts (Apple/Windows optimized)
  - Base size: 1rem (16px)
  - Scale: 0.75rem to 2.5rem

- **Components**:
  - Border radius: 8px - 16px
  - Backdrop blur: 10px
  - Animations: Smooth transitions (0.3s)

## 🚀 Deployment

### Production Build
```bash
npm run build
# Creates optimized dist/ folder
```

### With Nginx
Nginx is configured for:
- Static asset serving
- Gzip compression
- Cache control
- SPA routing (history mode)

### Environment Setup
For production, update the backend URL:
```bash
export VITE_API_BASE_URL=https://your-backend-domain.com
npm run build
```

## 📝 Development

### Adding New Features

1. Create new component in `src/components/`
2. Add styling in corresponding `.css` file
3. Import and use in `App.jsx`
4. Update service layer if needed

### Modifying API Calls

Edit `src/services/api.js`:
- Add new endpoints
- Update error handling
- Configure timeouts

### YouTube URL Parser

Located in `src/utils/youtube.js`:
- `extractYouTubeVideoId(url)` - Returns video ID or null
- `isValidYouTubeUrl(url)` - Returns boolean
- `getVideoIdOrError(url)` - Returns {success, videoId} or {success, error}

## 🤝 Contribution

When modifying the frontend:
1. Keep backend API contract unchanged
2. Maintain component modularity
3. Ensure responsive design
4. Update this README if adding major features

## ⚠️ Known Limitations

- Backend timeout: 5 minutes maximum
- Response size: Limited by browser memory
- Video ID extraction: YouTube URLs only

## 🔄 Workflow

### User Flow
1. User enters YouTube URL
2. Frontend validates and extracts video ID
3. User selects feature (Summary/Interview/Quiz)
4. User enters instructions
5. Frontend calls appropriate backend endpoint
6. Backend processes and returns response
7. Frontend renders and displays response

### Backend Integration
- Frontend does NOT perform RAG or LLM processing
- Frontend does NOT extract transcripts
- Frontend ONLY handles UI and API routing
- Backend remains unchanged and handles all processing

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Markdown Spec](https://commonmark.org)

## ✅ Checklist for Deployment

- [ ] Set environment variables
- [ ] Test all three features (Summary/Interview/Quiz)
- [ ] Test with various YouTube URL formats
- [ ] Test error handling
- [ ] Test responsive design on mobile
- [ ] Verify backend connectivity
- [ ] Build and test production build
- [ ] Deploy Docker containers
- [ ] Verify in production environment

---

**Built with ❤️ for YouTube AI Assistant**
