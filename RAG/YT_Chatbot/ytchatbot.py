from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.runnables import RunnableParallel, RunnablePassthrough, RunnableLambda
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate

def ask(video_id: str, question: str):
    try:
       
        ytt_api = YouTubeTranscriptApi()
        transcript_list =ytt_api.fetch(video_id,languages=['hi'])
        transcript = " ".join(getattr(chunk, "text", "") for chunk in transcript_list)
    except TranscriptsDisabled:
        return "No captions available for this video."
    except Exception as e:
        return f"Error fetching transcript: {e}"


    #--------------INDEXING--------------------------------------
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.create_documents([transcript])

    # Generate embedding and store in vector store
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    vector_store = FAISS.from_documents(chunks, embeddings)

    #----------------Building a Chain---------------------------------------------------
    def format_docs(retrieved_docs):
        context_text = "\n\n".join(doc.page_content for doc in retrieved_docs)
        return context_text

    retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 4})

    parallel_chain = RunnableParallel({
        'context': retriever | RunnableLambda(format_docs),
        'question': RunnablePassthrough()   # passes the question unchanged.
    })

    parser = StrOutputParser()
    llm = ChatOllama(model="ministral-3:8b", temperature=0.2)

    prompt = PromptTemplate(
        template="""
      You are a helpful assistant.
      Answer ONLY from the provided transcript context.
      If the context is insufficient, just say you don't know.

      {context}
      Question: {question}
    """,
        input_variables=['context', 'question']
    )

    main_chain = parallel_chain | prompt | llm | parser

    return main_chain.invoke(question)
