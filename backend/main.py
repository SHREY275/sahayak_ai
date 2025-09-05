from fastapi import FastAPI, UploadFile, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from backend import crud, models, database, auth
from backend.auth import get_db, get_password_hash, authenticate_user, create_access_token, get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from backend.schemas import (
    UserCreate, UserUpdate, UserOut,
    SchemeCreate, SchemeUpdate, SchemeOut,
    ApplicationCreate, ApplicationOut
)
from backend.database import Base, engine

# LLM imports
from pydantic import BaseModel
from langchain.chains import RetrievalQA
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings, HuggingFaceEndpoint
from dotenv import load_dotenv
import os

# ---------- INIT ----------
Base.metadata.create_all(bind=engine)
load_dotenv()

app = FastAPI(title="SahayakAI", version="1.0")
DB_PATH = "chroma_db"

# ---------- ROOT ----------
@app.get("/")
def root():
    return {"message": "Welcome to SahayakAI backend 🚀"}

# ---------- USERS ----------
@app.post("/users/", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, **user.dict())

@app.get("/users/", response_model=List[UserOut])
def list_users(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    return crud.get_users(db, skip=skip, limit=limit)

@app.get("/users/me")
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "age": current_user.age,
        "gender": current_user.gender,
        "caste": current_user.caste,
        "income": current_user.income,
        "location": current_user.location,
        "occupation": current_user.occupation
    }

@app.get("/users/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    u = crud.get_user(db, user_id)
    if not u:
        raise HTTPException(status_code=404, detail="User not found")
    return u

@app.put("/users/{user_id}", response_model=UserOut)
def update_user(user_id: int, data: UserUpdate, db: Session = Depends(get_db)):
    u = crud.update_user(db, user_id, data.dict(exclude_unset=True))
    if not u:
        raise HTTPException(status_code=404, detail="User not found")
    return u

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    u = crud.delete_user(db, user_id)
    if not u:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": f"user {user_id} deleted"}

# ---------- SCHEMES ----------
@app.post("/schemes/", response_model=SchemeOut)
def create_scheme(s: SchemeCreate, db: Session = Depends(get_db)):
    if crud.get_scheme_by_name(db, s.scheme_name):
        raise HTTPException(status_code=400, detail="Scheme name already exists")
    return crud.create_scheme(db, s.scheme_name, s.description, s.eligibility_rules)

@app.get("/schemes/", response_model=List[SchemeOut])
def list_schemes(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    return crud.get_schemes(db, skip, limit)

@app.get("/schemes/{scheme_id}", response_model=SchemeOut)
def get_scheme(scheme_id: int, db: Session = Depends(get_db)):
    s = crud.get_scheme(db, scheme_id)
    if not s:
        raise HTTPException(status_code=404, detail="Scheme not found")
    return s

@app.put("/schemes/{scheme_id}", response_model=SchemeOut)
def update_scheme(scheme_id: int, data: SchemeUpdate, db: Session = Depends(get_db)):
    s = crud.update_scheme(db, scheme_id, data.dict(exclude_unset=True))
    if not s:
        raise HTTPException(status_code=404, detail="Scheme not found")
    return s

@app.delete("/schemes/{scheme_id}")
def delete_scheme(scheme_id: int, db: Session = Depends(get_db)):
    s = crud.delete_scheme(db, scheme_id)
    if not s:
        raise HTTPException(status_code=404, detail="Scheme not found")
    return {"message": f"scheme {scheme_id} deleted"}

# ---------- ELIGIBILITY ----------
@app.get("/eligibility/{user_id}", response_model=List[SchemeOut])
def eligible_schemes(user_id: int, db: Session = Depends(get_db)):
    return crud.eligible_schemes_for_user(db, user_id)

# ---------- APPLICATIONS ----------
@app.post("/applications/", response_model=ApplicationOut)
def apply_for_scheme(payload: ApplicationCreate, db: Session = Depends(get_db)):
    if not crud.get_user(db, payload.user_id):
        raise HTTPException(status_code=404, detail="User not found")
    if not crud.get_scheme(db, payload.scheme_id):
        raise HTTPException(status_code=404, detail="Scheme not found")
    return crud.create_application(db, payload.user_id, payload.scheme_id, payload.submitted_docs)

@app.get("/applications/user/{user_id}", response_model=List[ApplicationOut])
def list_user_applications(user_id: int, db: Session = Depends(get_db)):
    if not crud.get_user(db, user_id):
        raise HTTPException(status_code=404, detail="User not found")
    return crud.get_applications_for_user(db, user_id)

@app.put("/applications/{app_id}/status", response_model=ApplicationOut)
def update_application_status(app_id: int, status: str, db: Session = Depends(get_db)):
    app_obj = crud.update_application_status(db, app_id, status)
    if not app_obj:
        raise HTTPException(status_code=404, detail="Application not found")
    return app_obj

# ---------- FILE UPLOAD ----------
@app.post("/upload-docs")
async def upload_docs(file: UploadFile):
    return {"filename": file.filename, "status": "uploaded (OCR pending)"}

# ---------- AUTH ----------
@app.post("/register")
def register_user(
    email: str,
    password: str,
    full_name: str,
    age: int,
    gender: str,
    caste: str,
    income: int,
    location: str,
    occupation: str,
    db: Session = Depends(database.get_db)
):
    new_user = models.User(
        full_name=full_name,
        age=age,
        gender=gender,
        caste=caste,
        income=income,
        location=location,
        occupation=occupation,
        email=email,
        hashed_password=get_password_hash(password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered", "user_id": new_user.id}

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me")
def read_profile(current_user: models.User = Depends(get_current_user)):
    return {
        "email": current_user.email,
        "name": current_user.full_name,
        "role": current_user.role
    }



#--------------------------------------------------


import re
from fastapi import FastAPI
from pydantic import BaseModel
from langchain.chains import RetrievalQA
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from transformers import pipeline
from langchain.llms import HuggingFacePipeline

app = FastAPI(title="SahayakAI", version="1.0")

# ----- Setup -----
generator = pipeline(
    "text2text-generation",
    model="google/flan-t5-base",  # or large if GPU
    device=-1
)
local_llm = HuggingFacePipeline(pipeline=generator)

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectordb = Chroma(persist_directory="backend/chroma_db", embedding_function=embeddings)

qa = RetrievalQA.from_chain_type(
    llm=local_llm,
    retriever=vectordb.as_retriever(search_kwargs={"k": 3}),
    chain_type="stuff"
)

class ChatRequest(BaseModel):
    question: str

def parse_schemes(raw_text: str):
    """
    Extracts scheme details from raw LLM output.
    """
    schemes = []
    # Regex to catch scheme blocks
    pattern = re.compile(
        r"Scheme Name:\s*(.*?)\s*Level:\s*(.*?)\s*Ministry/Department:\s*(.*?)\s*Benefits:\s*(.*?)\s*Eligibility:\s*(.*?)(?=(Scheme Name:|$))",
        re.DOTALL
    )
    matches = pattern.findall(raw_text)
    for match in matches:
        schemes.append({
            "name": match[0].strip(),
            "level": match[1].strip(),
            "ministry": match[2].strip(),
            "benefits": match[3].strip(),
            "eligibility": match[4].strip()
        })
    return schemes

@app.post("/chat")
def chat_schemes(req: ChatRequest):
    result = qa.invoke({"query": req.question})
    raw_text = result.get("result", "")
    structured = parse_schemes(raw_text)
    return {"question": req.question, "schemes": structured or raw_text}



#-------------------------------OCR + HANDLING FILES

# backend/main.py
from fastapi import FastAPI, UploadFile, File, HTTPException
from pdf2image import convert_from_path
import pytesseract
import os
import shutil
import tempfile


POPPLER_PATH = r"D:\Users\poppler-25.07.0\Library\bin"


@app.post("/upload-docs")
async def upload_docs(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_pdf:
        shutil.copyfileobj(file.file, tmp_pdf)
        tmp_pdf_path = tmp_pdf.name

    try:
        images = convert_from_path(tmp_pdf_path, poppler_path=POPPLER_PATH)

        extracted_text = []
        for i, img in enumerate(images, start=1):
            text = pytesseract.image_to_string(img)
            extracted_text.append({"page": i, "text": text.strip()})

        return {
            "filename": file.filename,
            "pages": extracted_text
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR failed: {str(e)}")

    finally:
        # Clean up temp file
        if os.path.exists(tmp_pdf_path):
            os.remove(tmp_pdf_path)
