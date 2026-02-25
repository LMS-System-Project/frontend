from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    verify_password,
    hash_password,
)
from app.db.base import get_db
from app.models.models import User
from app.schemas.schemas import LoginRequest, RefreshRequest, TokenResponse, UserCreate

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    """
    Authenticate a user and return JWT access + refresh tokens.
    Rate-limited to 10 req/min (enforced at middleware level).
    """
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated",
        )

    token_data = {"sub": str(user.id), "role": user.role.value, "email": user.email}
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        role=user.role.value,
        user_id=str(user.id),
        full_name=user.full_name,
    )


@router.post("/refresh", response_model=TokenResponse)
def refresh(payload: RefreshRequest, db: Session = Depends(get_db)):
    """Exchange a valid refresh token for a new access token."""
    token_data = decode_token(payload.refresh_token)
    if token_data.get("type") != "refresh":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token type")

    user = db.query(User).filter(User.id == token_data["sub"]).first()
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    new_data = {"sub": str(user.id), "role": user.role.value, "email": user.email}
    return TokenResponse(
        access_token=create_access_token(new_data),
        refresh_token=create_refresh_token(new_data),
        role=user.role.value,
        user_id=str(user.id),
        full_name=user.full_name,
    )


@router.post("/register", response_model=TokenResponse)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user and return JWT access + refresh tokens.
    """
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == payload.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )

    # Create new user
    new_user = User(
        email=payload.email,
        full_name=payload.full_name,
        hashed_password=hash_password(payload.password),
        role=payload.role,
        department=payload.department,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Generate tokens
    token_data = {"sub": str(new_user.id), "role": new_user.role.value, "email": new_user.email}
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        role=new_user.role.value,
        user_id=str(new_user.id),
        full_name=new_user.full_name,
    )


@router.post("/logout")
def logout():
    """
    Stateless JWT logout — client must discard tokens.
    For true revocation, add token ID to a Redis blocklist here.
    """
    return {"message": "Logged out successfully"}
