import streamlit as st
import requests

# ------------------------------------------------
# Page Configuration
# ------------------------------------------------
st.set_page_config(
    page_title="YouTube AI Assistant",
    page_icon="🎥",
    layout="centered"
)

# ------------------------------------------------
# Header
# ------------------------------------------------
st.title("🎥 YouTube AI Assistant")
st.markdown(
    """
Ask your YouTube video to:

- 📝 Summarize the video
- 💼 Generate Interview Questions
- ❓ Generate Quiz Questions
"""
)

st.divider()

# ------------------------------------------------
# Inputs
# ------------------------------------------------
video_url = st.text_input(
    "🔗 YouTube Video URL",
    placeholder="https://www.youtube.com/watch?v=..."
)

question = st.text_area(
    "💬 What would you like to do?",
    placeholder="""
Examples:
• Summarize this video
• Generate interview questions
• Generate 10 quiz questions
""",
    height=120
)

# ------------------------------------------------
# Ask Button
# ------------------------------------------------
if st.button("🚀 Generate", use_container_width=True):

    if not video_url:
        st.warning("Please enter a YouTube Video URL.")

    elif not question:
        st.warning("Please enter your request.")

    else:

        # ------------------------------------------
        # Decide Endpoint
        # ------------------------------------------
        q = question.lower()

        if any(word in q for word in [
            "quiz",
            "mcq",
            "multiple choice",
            "test",
            "practice questions"
        ]):
            endpoint = "/quiz"
        else:
            endpoint = "/chat"

        # ------------------------------------------
        # Call Backend
        # ------------------------------------------
        with st.spinner("🤖 Thinking..."):

            try:

                response = requests.post(
                    f"http://localhost:8000{endpoint}",
                    json={
                        "video_url": video_url,
                        "question": question
                    },
                    timeout=300
                )

                if response.status_code == 200:

                    data = response.json()

                    st.success("✅ Response Generated")

                    st.markdown("---")
                    st.markdown(data["answer"])

                else:

                    st.error(
                        f"Backend Error ({response.status_code})\n\n{response.text}"
                    )

            except requests.exceptions.ConnectionError:

                st.error(
                    "❌ Unable to connect to the FastAPI backend.\n\n"
                    "Make sure the backend container is running."
                )

            except Exception as e:

                st.error(f"Error: {e}")