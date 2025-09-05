from sqlalchemy.orm import Session
from . import models
import json
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from . import models

def get_schemes(db: Session):
    return db.query(models.Scheme).all()

def create_scheme(db: Session, scheme_name: str, description: str, eligibility: str):
    scheme = models.Scheme(
        scheme_name=scheme_name,
        description=description,
        eligibility=eligibility
    )
    db.add(scheme)
    db.commit()
    db.refresh(scheme)
    return scheme



def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def update_user(db: Session, user_id: int, updates: dict):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        for key, value in updates.items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user



# ---------- USERS ----------
def create_user(db: Session, **data):
    user = models.User(**data)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.User).offset(skip).limit(limit).all()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def update_user(db: Session, user_id: int, updates: dict):
    user = get_user(db, user_id)
    if not user:
        return None
    for k, v in updates.items():
        setattr(user, k, v)
    db.commit()
    db.refresh(user)
    return user

def delete_user(db: Session, user_id: int):
    user = get_user(db, user_id)
    if not user:
        return None
    db.delete(user)
    db.commit()
    return user

# ---------- SCHEMES ----------
def create_scheme(db: Session, scheme_name: str, description: str, eligibility_rules: Dict[str, Any]):
    scheme = models.Scheme(
        scheme_name=scheme_name,
        description=description,
        eligibility_rules=json.dumps(eligibility_rules)
    )
    db.add(scheme)
    db.commit()
    db.refresh(scheme)
    return scheme

def get_schemes(db: Session, skip: int = 0, limit: int = 50):
    return db.query(models.Scheme).offset(skip).limit(limit).all()

def get_scheme(db: Session, scheme_id: int):
    return db.query(models.Scheme).filter(models.Scheme.id == scheme_id).first()

def get_scheme_by_name(db: Session, scheme_name: str):
    return db.query(models.Scheme).filter(models.Scheme.scheme_name == scheme_name).first()

def update_scheme(db: Session, scheme_id: int, updates: dict):
    scheme = get_scheme(db, scheme_id)
    if not scheme:
        return None
    if "eligibility_rules" in updates and isinstance(updates["eligibility_rules"], dict):
        updates["eligibility_rules"] = json.dumps(updates["eligibility_rules"])
    for k, v in updates.items():
        setattr(scheme, k, v)
    db.commit()
    db.refresh(scheme)
    return scheme

def delete_scheme(db: Session, scheme_id: int):
    scheme = get_scheme(db, scheme_id)
    if not scheme:
        return None
    db.delete(scheme)
    db.commit()
    return scheme

# ---------- ELIGIBILITY ----------
def evaluate_eligibility(user: models.User, scheme: models.Scheme) -> bool:
    """
    Simple rule engine:
    - rules is JSON like:
      {"max_income": 250000, "min_age": 18, "max_age": 35,
       "occupation_in": ["student", "farmer"], "location_in": ["thane","mumbai"]}
    """
    rules = json.loads(scheme.eligibility_rules or "{}")

    def rule_ok():
        if "max_income" in rules and user.income > float(rules["max_income"]):
            return False
        if "min_income" in rules and user.income < float(rules["min_income"]):
            return False
        if "min_age" in rules and user.age < int(rules["min_age"]):
            return False
        if "max_age" in rules and user.age > int(rules["max_age"]):
            return False
        if "occupation_in" in rules and user.occupation.lower() not in [o.lower() for o in rules["occupation_in"]]:
            return False
        if "location_in" in rules and user.location.lower() not in [c.lower() for c in rules["location_in"]]:
            return False
        if "caste_in" in rules and user.caste and user.caste.lower() not in [c.lower() for c in rules["caste_in"]]:
            return False
        if "gender_in" in rules and user.gender.lower() not in [g.lower() for g in rules["gender_in"]]:
            return False
        return True

    return rule_ok()

def eligible_schemes_for_user(db: Session, user_id: int) -> List[models.Scheme]:
    user = get_user(db, user_id)
    if not user:
        return []
    schemes = get_schemes(db, 0, 500)
    return [s for s in schemes if evaluate_eligibility(user, s)]

# ---------- APPLICATIONS ----------
def create_application(db: Session, user_id: int, scheme_id: int, submitted_docs: Optional[dict] = None):
    app = models.Application(
        user_id=user_id,
        scheme_id=scheme_id,
        status="SUBMITTED",
        submitted_docs=json.dumps(submitted_docs or {})
    )
    db.add(app)
    db.commit()
    db.refresh(app)
    return app

def get_applications_for_user(db: Session, user_id: int):
    return db.query(models.Application).filter(models.Application.user_id == user_id).all()

def get_application(db: Session, app_id: int):
    return db.query(models.Application).filter(models.Application.id == app_id).first()

def update_application_status(db: Session, app_id: int, status: str):
    app = get_application(db, app_id)
    if not app:
        return None
    app.status = status
    app.updated_at = __import__("datetime").datetime.utcnow()
    db.commit()
    db.refresh(app)
    return app

