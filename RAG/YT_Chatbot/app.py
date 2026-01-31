import streamlit as st
from ytchatbot import ask

st.set_page_config(page_title="YouTube RAG Chatbot", layout="centered")
st.title("🎥 YouTube RAG Chatbot")
st.markdown("Ask questions based on the YouTube video transcript.")

video_id = st.text_input("Enter YouTube Video ID")
question = st.text_input("Ask a question about the video")

if st.button("Ask"):
    if not video_id or not question:
        st.warning("Please provide both video ID and question.")
    else:
        with st.spinner("Generating answer..."):
            answer = ask(video_id, question)
        st.subheader("Answer:")
        st.write(answer)
