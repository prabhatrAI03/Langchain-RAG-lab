/**
 * YouTube URL Parser and Validator
 * Extracts video ID from various YouTube URL formats
 */

export const extractYouTubeVideoId = (url) => {
  if (!url) return null;

  // Remove whitespace
  url = url.trim();

  // Pattern 1: https://www.youtube.com/watch?v=VIDEO_ID or https://www.youtube.com/watch?v=VIDEO_ID&...
  let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];

  // Pattern 2: https://youtu.be/VIDEO_ID
  match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];

  // Pattern 3: Just the video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  return null;
};

export const isValidYouTubeUrl = (url) => {
  return extractYouTubeVideoId(url) !== null;
};

export const getVideoIdOrError = (url) => {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) {
    return {
      success: false,
      error: "Invalid YouTube URL. Please enter a valid URL like: https://www.youtube.com/watch?v=... or https://youtu.be/..."
    };
  }
  return { success: true, videoId };
};
