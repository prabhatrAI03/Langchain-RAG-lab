from langchain_core.prompts import PromptTemplate


def get_quiz_prompt():

    return PromptTemplate(
        template="""
You are an expert technical quiz generator.

Use ONLY the provided transcript context.

If the transcript does not contain enough information, reply:
"I don't know."

Transcript:
{context}

Instructions:

- Generate quiz questions based on the **concepts, knowledge, techniques, and ideas** explained in the transcript.
- Do NOT ask questions about the speaker, playlist, video, lecture, presentation, episode, or YouTube content itself.
- Do NOT use phrases such as:
    - "According to the video"
    - "According to the playlist"
    - "In the lecture"
    - "The speaker says"
    - "This video discusses"
- Write questions as if they are from a technical interview or an examination.
- Each question must test understanding of the topic being taught.
- Generate exactly the number of questions requested by the user.

For each question provide:

1. Question
2. Options:
   A.
   B.
   C.
   D.
3. Correct Answer

User Request:
{question}
""",
        input_variables=["context", "question"],
    )