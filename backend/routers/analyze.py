from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from fastapi.requests import Request
from sqlalchemy.orm import Session
import database, models
import json
from utils.pdb_parser import parse_pdb
from utils.ai_summary import generate_ai_summary
from utils.security import SECRET_KEY, ALGORITHM
from jose import jwt, JWTError
from typing import Optional

router = APIRouter(prefix="/analyze", tags=["analyze"])

def get_current_user_optional(request: Request, db: Session = Depends(database.get_db)):
    token = request.cookies.get("access_token")
    if not token:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id:
            return db.query(models.User).filter(models.User.id == user_id).first()
    except JWTError:
        pass
    return None

@router.post("")
async def analyze_pdb(
    file: UploadFile = File(...),
    ligand_name: Optional[str] = Form(None),
    db: Session = Depends(database.get_db),
    current_user: Optional[models.User] = Depends(get_current_user_optional)
):
    if not file.filename.lower().endswith(".pdb"):
        raise HTTPException(status_code=400, detail="Only .pdb files are accepted")
        
    content = await file.read()
    if len(content) > 50 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Maximum 50MB.")
        
    try:
        text = content.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="File is not valid UTF-8 text")
        
    analysis_results = parse_pdb(text, target_ligand=ligand_name)
    if analysis_results.get("status") == "error":
        raise HTTPException(status_code=400, detail=analysis_results.get("message"))
        
    ai_summary = generate_ai_summary(analysis_results)
    
    pdb_summary = {
        "filename": file.filename,
        "size": len(content),
    }

    result = {
        "analysis": analysis_results,
        "ai_summary": ai_summary,
        "pdb_summary": pdb_summary
    }

    if current_user:
        analysis_record = models.Analysis(
            user_id=current_user.id,
            label=file.filename,
            pdb_filename=file.filename,
            ligand_name=analysis_results.get("ligand", "UNKNOWN"),
            source="upload",
            result_json=json.dumps(analysis_results),
            ai_summary=ai_summary,
            pdb_summary=json.dumps(pdb_summary)
        )
        db.add(analysis_record)
        db.commit()
        db.refresh(analysis_record)
        result["analysis_id"] = analysis_record.id

    return result
