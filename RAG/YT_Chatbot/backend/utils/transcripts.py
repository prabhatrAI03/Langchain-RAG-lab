from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled


def fetch_transcript(video_id: str):
    try:
        ytt_api = YouTubeTranscriptApi()

        transcript_list = ytt_api.fetch(
            video_id,
            languages=[ "hi","en","fr","zh"]
        )

        transcript = " ".join(
            getattr(chunk, "text", "")
            for chunk in transcript_list
        )

        return transcript

    except TranscriptsDisabled:
        return "No captions available for this video."

    except Exception as e:
        return f"Error fetching transcript: {e}"
