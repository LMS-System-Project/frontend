import sys
import os

# Add the current directory to path so we can import app
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.base import SessionLocal
from app.models.models import User, RoleEnum
from app.core.security import hash_password

def seed_admin():
    db = SessionLocal()
    email = "admin@gradeflow.com"
    password = "admin123"
    full_name = "Master Admin"

    print(f"[*] Checking for Admin user: {email}")
    
    admin_user = db.query(User).filter(User.email == email).first()
    
    if admin_user:
        print(f"[!] Admin user already exists. Updating password...")
        admin_user.hashed_password = hash_password(password)
        admin_user.role = RoleEnum.ADMIN
    else:
        print(f"[*] Creating new Admin user...")
        admin_user = User(
            email=email,
            full_name=full_name,
            hashed_password=hash_password(password),
            role=RoleEnum.ADMIN,
            is_active=True,
            is_verified=True
        )
        db.add(admin_user)
    
    try:
        db.commit()
        print(f"[+] Admin account successfully synchronized!")
        print(f"    Email: {email}")
        print(f"    Password: {password}")
    except Exception as e:
        db.rollback()
        print(f"[-] Error seeding admin: {str(e)}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_admin()
