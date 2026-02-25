from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import get_token_payload, require_role
from app.db.base import get_db
from app.models.models import User, StudentProfile, Enrollment, Assignment, Submission, GradeHistory
from app.schemas.schemas import StudentDashboardResponse, SubmissionOut
from app.ai.engine import predict_drop_risk, generate_career_recommendations, detect_grade_anomalies

router = APIRouter(prefix="/student", tags=["Student"])


@router.get("/dashboard")
def student_dashboard(
    payload: dict = Depends(require_role("student")),
    db: Session = Depends(get_db),
):
    """Return aggregated dashboard data for the authenticated student."""
    user = db.query(User).filter(User.id == payload["sub"]).first()
    profile = user.student_profile if user else None

    return {
        "full_name": user.full_name if user else "Unknown",
        "cgpa": profile.cgpa if profile else 0.0,
        "year": profile.year_of_study if profile else 1,
        "courses_enrolled": len(user.enrollments) if user else 0,
        "assignments_due": 3,  # placeholder — query from DB
        "completion_rate": 72.5,
        "drop_risk": predict_drop_risk(
            cgpa=profile.cgpa or 0.0,
            attendance_pct=profile.attendance_percentage,
            assignments_missed=1,
            engagement_score=0.75,
        ) if profile else {"risk_score": 0, "risk_level": "Low"},
    }


@router.get("/courses")
def student_courses(
    payload: dict = Depends(require_role("student")),
    db: Session = Depends(get_db),
):
    """Return all courses the student is enrolled in."""
    user = db.query(User).filter(User.id == payload["sub"]).first()
    enrollments = db.query(Enrollment).filter(Enrollment.student_id == user.id).all() if user else []
    return [
        {
            "course_id": str(e.course_id),
            "title": e.course.title,
            "code": e.course.code,
            "instructor": e.course.instructor.user.full_name if e.course.instructor else "N/A",
            "progress": e.progress,
            "final_grade": e.final_grade,
        }
        for e in enrollments
    ]


@router.get("/career")
def career_recommendations(
    payload: dict = Depends(require_role("student")),
    db: Session = Depends(get_db),
):
    """Return AI career recommendations for the authenticated student."""
    user = db.query(User).filter(User.id == payload["sub"]).first()
    profile = user.student_profile if user else None

    return generate_career_recommendations(
        department=user.department or "Computer Science",
        cgpa=profile.cgpa or 7.5,
        strong_subjects=["Algorithms", "Data Structures"],
        weak_subjects=["Cloud Computing"],
    )


@router.get("/grade-anomalies")
def grade_anomalies(
    payload: dict = Depends(require_role("student")),
    db: Session = Depends(get_db),
):
    """Detect anomalies in the student's grade history."""
    user = db.query(User).filter(User.id == payload["sub"]).first()
    profile = user.student_profile if user else None
    history = []
    if profile:
        history = [
            {"sem": h.semester, "gpa": h.gpa}
            for h in profile.grade_history
        ]

    return detect_grade_anomalies(
        student_id=str(user.id) if user else "",
        semester_grades=history,
    )
