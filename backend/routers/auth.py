from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import models, database
from utils.security import get_password_hash, verify_password, create_access_token, create_refresh_token, REFRESH_TOKEN_EXPIRE_DAYS
from typing import Optional
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/auth", tags=["auth"])

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    display_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    display_name: Optional[str] = None
    gemini_api_key: Optional[str] = None

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, request: Request, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = models.User(email=user.email, password_hash=hashed_password, display_name=user.display_name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    audit = models.AuditLog(user_id=new_user.id, event="register", ip_address=request.client.host)
    db.add(audit)
    db.commit()

    return {"message": "Verification email sent. Please check your inbox."}

@router.post("/login")
async def login(user_credentials: UserLogin, response: Response, request: Request, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    if user.locked_until and user.locked_until > datetime.utcnow():
        raise HTTPException(status_code=403, detail="Too many failed attempts. Account locked for 15 minutes.")
        
    if not verify_password(user_credentials.password, user.password_hash):
        user.failed_login_attempts += 1
        if user.failed_login_attempts >= 10:
            user.locked_until = datetime.utcnow() + timedelta(minutes=15)
        db.commit()
        raise HTTPException(status_code=401, detail="Incorrect email or password")
        
    user.failed_login_attempts = 0
    user.locked_until = None
    
    access_token = create_access_token(data={"sub": user.id, "email": user.email})
    refresh_token = create_refresh_token()
    hashed_rt = get_password_hash(refresh_token)
    
    new_session = models.Session(
        user_id=user.id, 
        refresh_token=hashed_rt, 
        user_agent=request.headers.get('user-agent', ''),
        ip_address=request.client.host,
        expires_at=datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    )
    db.add(new_session)
    
    audit = models.AuditLog(user_id=user.id, event="login_success", ip_address=request.client.host)
    db.add(audit)
    db.commit()
    
    response.set_cookie(
        key="access_token", value=access_token, httponly=True, secure=True, samesite="strict", max_age=15*60, path="/"
    )
    response.set_cookie(
        key="refresh_token", value=refresh_token, httponly=True, secure=True, samesite="strict", max_age=REFRESH_TOKEN_EXPIRE_DAYS*24*60*60, path="/auth/refresh"
    )

    return {
        "user": {
            "id": user.id,
            "email": user.email,
            "display_name": user.display_name,
            "photo_url": user.photo_url,
            "email_verified": user.email_verified
        }
    }

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Logged out."}

@router.get("/me")
async def get_me(request: Request, db: Session = Depends(database.get_db)):
    from jose import jwt, JWTError
    from utils.security import SECRET_KEY, ALGORITHM
    
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
        
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
        
    return {"user": {
        "id": user.id,
        "email": user.email,
        "display_name": user.display_name,
        "photo_url": user.photo_url,
        "email_verified": user.email_verified,
        "gemini_api_key": user.gemini_api_key,
        "created_at": user.created_at
    }}

@router.patch("/profile")
async def update_profile(
    user_update: UserUpdate, 
    request: Request, 
    db: Session = Depends(database.get_db)
):
    from jose import jwt, JWTError
    from utils.security import SECRET_KEY, ALGORITHM
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
        
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
        
    if user_update.display_name is not None:
        user.display_name = user_update.display_name
    if user_update.gemini_api_key is not None:
        user.gemini_api_key = user_update.gemini_api_key
        
    db.commit()
    db.refresh(user)
    
    return {"user": {
        "id": user.id,
        "email": user.email,
        "display_name": user.display_name,
        "photo_url": user.photo_url,
        "email_verified": user.email_verified,
        "gemini_api_key": user.gemini_api_key,
        "created_at": user.created_at
    }}
