from sqlalchemy.orm import Session
from backend.database import SessionLocal, engine
from backend import models, crud

models.Base.metadata.create_all(bind=engine)

data = [
    {
        "scheme_name": "National Scholarship (Undergrad)",
        "description": "Financial aid for undergraduate students",
        "eligibility_rules": {"max_income": 250000, "min_age": 17, "max_age": 30, "occupation_in": ["student"]}
    },
    {
        "scheme_name": "PM Kisan",
        "description": "Income support to farmers with small landholdings",
        "eligibility_rules": {"max_income": 600000, "occupation_in": ["farmer"]}
    },
    {
        "scheme_name": "Maharashtra Housing Aid",
        "description": "State housing subsidy for low-income families",
        "eligibility_rules": {"max_income": 400000, "location_in": ["mumbai", "thane", "pune"]}
    }
]

db: Session = SessionLocal()
for s in data:
    if not crud.get_scheme_by_name(db, s["scheme_name"]):
        crud.create_scheme(db, s["scheme_name"], s["description"], s["eligibility_rules"])
db.close()
print("Seeded schemes ✅")
