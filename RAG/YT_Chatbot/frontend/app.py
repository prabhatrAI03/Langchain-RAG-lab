import streamlit as st
import requests

# ------------------------------
# Streamlit Page Configuration
# ------------------------------
st.set_page_config(
    page_title="YouTube RAG Chatbot",
    layout="centered"
)

st.title("🎥 YouTube RAG Chatbot")

# ------------------------------
# User Inputs
# ------------------------------
video_url = st.text_input(
    "Enter YouTube Video URL",
    placeholder="https://www.youtube.com/watch?v=..."
)

question = st.text_area(
    "Ask your question",
    placeholder="What is this video about?"
)

# ------------------------------
# Ask Button
# ------------------------------
if st.button("Ask"):

    if not video_url:
        st.warning("Please enter a YouTube URL.")

    elif not question:
        st.warning("Please enter a question.")

    else:

        with st.spinner("Generating response..."):

            try:

                response = requests.post(
                    "http://backend:8000/chat",   # Use this when running with Docker Compose
                    json={
                        "video_url": video_url,
                        "question": question
                    },
                    timeout=300
                )

                if response.status_code == 200:

                    data = response.json()

                    st.success("Answer Generated")

                    st.write(data["answer"])

                else:

                    st.error(
                        f"Backend Error ({response.status_code})\n\n{response.text}"
                    )

            except requests.exceptions.ConnectionError:

                st.error(
                    "Unable to connect to FastAPI backend.\n"
                    "Make sure the backend container is running."
                )

            except Exception as e:

                st.error(str(e))