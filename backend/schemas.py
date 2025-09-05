from typing import Optional, List, Dict, Any
from pydantic import BaseModel

# ---------- USERS ----------
class UserBase(BaseModel):
    full_name: str
    age: int
    gender: str
    caste: Optional[str] = None
    income: float
    location: str
    occupation: str


class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    caste: Optional[str] = None
    income: Optional[float] = None
    location: Optional[str] = None
    occupation: Optional[str] = None

class UserOut(UserBase):
    id: int
    class Config:
        orm_mode = True

# ---------- SCHEMES ----------
class SchemeBase(BaseModel):
    scheme_name: str
    description: str
    eligibility_rules: Dict[str, Any]

class SchemeCreate(SchemeBase):
    pass

class SchemeUpdate(BaseModel):
    scheme_name: Optional[str] = None
    description: Optional[str] = None
    eligibility_rules: Optional[Dict[str, Any]] = None

class SchemeOut(SchemeBase):
    id: int
    class Config:
        orm_mode = True

# ---------- APPLICATIONS ----------
class ApplicationCreate(BaseModel):
    user_id: int
    scheme_id: int
    submitted_docs: Optional[Dict[str, Any]] = None

class ApplicationOut(BaseModel):
    id: int
    user_id: int
    scheme_id: int
    status: str
    submitted_docs: Optional[str] = None
    class Config:
        orm_mode = True
