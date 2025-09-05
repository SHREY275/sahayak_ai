# # ingest.py
# import os
# from langchain.document_loaders import PyPDFLoader
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_openai import OpenAIEmbeddings
# from langchain.vectorstores import Chroma

# DATA_PATH = "data/schemes"
# DB_PATH = "chroma_db"

# def ingest_docs():
#     documents = []
#     for file in os.listdir(DATA_PATH):
#         if file.endswith(".pdf"):
#             loader = PyPDFLoader(os.path.join(DATA_PATH, file))
#             documents.extend(loader.load())

#     splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
#     chunks = splitter.split_documents(documents)

#     embeddings = OpenAIEmbeddings()
#     vectordb = Chroma.from_documents(chunks, embedding=embeddings, persist_directory=DB_PATH)
#     vectordb.persist()
#     print(f"✅ Ingested {len(chunks)} chunks into {DB_PATH}")

# if __name__ == "__main__":
#     ingest_docs()

from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader

DB_PATH = "backend/chroma_db"

def ingest_docs():
    # Step 1: Load PDF
    loader = PyPDFLoader("data/schemes/SahayakAI_Schemes_Report.pdf")
    docs = loader.load()

    # Step 2: Split into chunks
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_documents(docs)

    # Step 3: Embeddings + Chroma
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    vectordb = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=DB_PATH
    )

    print(f"✅ Ingested {len(chunks)} chunks into {DB_PATH}")

if __name__ == "__main__":
    ingest_docs()
