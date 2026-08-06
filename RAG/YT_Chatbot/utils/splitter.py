from langchain_text_splitters import RecursiveCharacterTextSplitter


def split_transcript(
    transcript: str,
    chunk_size: int = 1000,
    chunk_overlap: int = 200
):
    """
    Split transcript into LangChain Document chunks.

    Args:
        transcript (str): Complete transcript text.
        chunk_size (int): Maximum size of each chunk.
        chunk_overlap (int): Overlap between consecutive chunks.

    Returns:
        List[Document]: List of LangChain Document objects.
    """

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap
    )

    chunks = splitter.create_documents([transcript])

    return chunks