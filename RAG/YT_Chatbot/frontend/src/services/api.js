import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5 minutes
  headers: {
    'Content-Type': 'application/json'
  }
});

export const api = {
  /**
   * Call /chat endpoint for Summary or Interview
   */
  chat: async (videoId, question) => {
    try {
      const response = await apiClient.post('/chat', {
        video_url: videoId,
        question: question
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * Call /quiz endpoint for Quiz generation
   */
  quiz: async (videoId, question) => {
    try {
      const response = await apiClient.post('/quiz', {
        video_url: videoId,
        question: question
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return handleError(error);
    }
  }
};

const handleError = (error) => {
  if (error.response) {
    // Backend responded with error status
    const status = error.response.status;
    const data = error.response.data;
    
    let message = `Backend Error (${status})`;
    
    if (data.detail) {
      message = data.detail;
    } else if (typeof data === 'string') {
      message = data;
    } else if (data.error) {
      message = data.error;
    }

    return {
      success: false,
      error: message,
      status: status
    };
  } else if (error.request) {
    // Request made but no response
    return {
      success: false,
      error: 'Unable to connect to backend. Please check if the server is running and accessible.',
      status: 0
    };
  } else {
    // Error in request setup
    return {
      success: false,
      error: error.message || 'An unknown error occurred',
      status: null
    };
  }
};

export default api;
