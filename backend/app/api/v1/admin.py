from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import require_role
from app.db.base import get_db
from app.models.models import User, StudentProfile, Course
from app.schemas.schemas import AdminDashboardResponse
from app.ai.engine import predict_drop_risk

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/dashboard", response_model=AdminDashboardResponse)
def admin_dashboard(
    payload: dict = Depends(require_role("admin")),
    db: Session = Depends(get_db),
):
    """University-wide analytics for admin dashboard."""
    total_students = db.query(User).filter(User.role == "student").count()
    total_instructors = db.query(User).filter(User.role == "instructor").count()
    active_courses = db.query(Course).filter(Course.status == "active").count()

    # At-risk: students with drop_risk_score > 0.5
    at_risk = db.query(StudentProfile).filter(StudentProfile.drop_risk_score > 0.5).count()

    return AdminDashboardResponse(
        total_students=total_students,
        total_instructors=total_instructors,
        active_courses=active_courses,
        active_sessions=0,  # integrate with Redis session tracking
        at_risk_count=at_risk,
    )


@router.get("/students")
def list_students(
    payload: dict = Depends(require_role("admin")),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 50,
    department: str | None = None,
):
    """Paginated student list with optional department filter."""
    query = db.query(User).filter(User.role == "student")
    if department:
        query = query.filter(User.department == department)
    students = query.offset(skip).limit(limit).all()
    return [
        {
            "id": str(s.id),
            "full_name": s.full_name,
            "email": s.email,
            "department": s.department,
            "cgpa": s.student_profile.cgpa if s.student_profile else None,
            "drop_risk": s.student_profile.drop_risk_score if s.student_profile else 0.0,
        }
        for s in students
    ]


@router.post("/recalculate-risk")
def recalculate_all_drop_risk(
    payload: dict = Depends(require_role("admin")),
    db: Session = Depends(get_db),
):
    """
    Batch recalculate drop-risk scores for all students.
    In production: dispatch as a Celery background task.
    """
    profiles = db.query(StudentProfile).all()
    updated = 0
    for profile in profiles:
        result = predict_drop_risk(
            cgpa=profile.cgpa or 0.0,
            attendance_pct=profile.attendance_percentage,
            assignments_missed=0,
            engagement_score=0.5,
        )
        profile.drop_risk_score = result["risk_score"]
        updated += 1
    db.commit()
    return {"updated": updated, "message": "Drop-risk scores recalculated"}
