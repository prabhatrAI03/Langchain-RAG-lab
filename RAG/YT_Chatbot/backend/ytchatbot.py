from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
from utils.transcripts import fetch_transcript
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import ChatOllama, OllamaEmbeddings
from services.summary import get_summary_prompt 
from langchain_core.runnables import RunnableParallel, RunnablePassthrough, RunnableLambda
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_chroma import Chroma
from utils.splitter import split_transcript
from services.interview import get_interview_prompt 
from services.quiz import get_quiz_prompt





def ask(video_id: str, question: str, prompt):
    transcript = fetch_transcript(video_id)

    #-----------------------------------INDEXING------------------------------------------------------
    chunks=split_transcript(transcript)

    # Generate embedding and store in vector store
    embeddings = OllamaEmbeddings(
    model="nomic-embed-text",
    base_url="http://host.docker.internal:11434"
    )


    vector_store = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    collection_name="youtube_chatbot",
    persist_directory="./chroma_langchain_db",
    )



    #-------------------------------Building a Chain---------------------------------------------------
    def format_docs(retrieved_docs):
        context_text = "\n\n".join(doc.page_content for doc in retrieved_docs)
        return context_text

    retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 4})

    parallel_chain = RunnableParallel({
        'context': retriever | RunnableLambda(format_docs),
        'question': RunnablePassthrough()   # passes the question unchanged.
    })

    parser = StrOutputParser() #It converts the LLM output into a plain Python string
    llm = ChatOllama(model="nemotron-3-super:cloud", base_url="http://host.docker.internal:11434",temperature=0.2)


    main_chain = parallel_chain | prompt | llm | parser

    return main_chain.invoke(question)
    
