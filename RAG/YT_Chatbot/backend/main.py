from fastapi import FastAPI
from pydantic import BaseModel
from ytchatbot import ask

from langchain_core.prompts import PromptTemplate
from services.summary import get_summary_prompt
from services.interview import get_interview_prompt
from services.quiz import get_quiz_prompt
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://127.0.0.1",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ChatRequest(BaseModel):
    video_url: str
    question: str
    

def detect_intent(question:str):

    q = question.lower()

    if any(word in q for word in [
        "summary",
        "summarize",
        "summarise"
    ]):
        return "summary"

    elif any(word in q for word in [
        "interview",
        "interview questions",
        "prepare me for interview"
    ]):
        return "interview"

    return "chat"


@app.post("/chat")
def chat(req: ChatRequest):

    intent = detect_intent(req.question)

    if intent == "summary":
        prompt = get_summary_prompt()

    elif intent == "interview":
        prompt = get_interview_prompt()

    else:
        return {
            "answer": "Please ask either for a summary or interview questions."
        }

    answer = ask(
        req.video_url,
        req.question,
        prompt
    )

    return {
        "answer": answer
    }


@app.post("/quiz")
def quiz(req: ChatRequest):
    answer = ask(   
        req.video_url,
        req.question,
        get_quiz_prompt()
    )

    return {
        "answer": answer
    }
