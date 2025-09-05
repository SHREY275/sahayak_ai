from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=True)
    caste = Column(String, nullable=True)
    income = Column(Float, nullable=True)
    location = Column(String, nullable=True)
    occupation = Column(String, nullable=True)

    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    role = Column(String, default="user")

    applications = relationship("Application", back_populates="user", cascade="all, delete-orphan")



class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(Integer, primary_key=True, index=True)
    scheme_name = Column(String, index=True, unique=True, nullable=False)
    description = Column(Text, nullable=False)
    # Store simple rule JSON as text (e.g., {"max_income": 250000, "occupation_in": ["student"]})
    eligibility_rules = Column(Text, nullable=False)  

    applications = relationship("Application", back_populates="scheme", cascade="all, delete-orphan")


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    scheme_id = Column(Integer, ForeignKey("schemes.id", ondelete="CASCADE"), nullable=False)
    status = Column(String, default="DRAFT")  # DRAFT | SUBMITTED | UNDER_REVIEW | APPROVED | REJECTED
    submitted_docs = Column(Text, nullable=True)  # JSON text of file keys/paths
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="applications")
    scheme = relationship("Scheme", back_populates="applications")




    
