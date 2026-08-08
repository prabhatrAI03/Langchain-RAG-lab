from fastapi import FastAPI
from pydantic import BaseModel

from ytchatbot import ask

app = FastAPI()


class ChatRequest(BaseModel):
    video_url: str
    question: str


@app.post("/chat")
def chat(req: ChatRequest):
    answer = ask(
        req.video_url,
        req.question
    )

    return {
        "answer": answer
    }