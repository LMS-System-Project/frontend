from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import require_role
from app.db.base import get_db
from app.models.models import User, Course, Assignment, Submission, SubmissionStatus
from app.schemas.schemas import GradeOverrideRequest
from app.ai.engine import grade_submission

router = APIRouter(prefix="/instructor", tags=["Instructor"])


@router.get("/dashboard")
def instructor_dashboard(
    payload: dict = Depends(require_role("instructor")),
    db: Session = Depends(get_db),
):
    """Aggregated instructor dashboard: courses, students, pending submissions."""
    user = db.query(User).filter(User.id == payload["sub"]).first()
    profile = user.instructor_profile if user else None
    courses = profile.courses if profile else []

    return {
        "full_name": user.full_name if user else "Unknown",
        "designation": profile.designation if profile else "",
        "courses_teaching": len(courses),
        "total_students": sum(len(c.enrollments) for c in courses),
        "pending_submissions": sum(
            len([s for s in a.submissions if s.status == SubmissionStatus.SUBMITTED])
            for c in courses
            for a in c.assignments
        ),
        "average_rating": profile.average_rating if profile else 0.0,
    }


@router.get("/courses")
def instructor_courses(
    payload: dict = Depends(require_role("instructor")),
    db: Session = Depends(get_db),
):
    """List all courses the instructor teaches."""
    user = db.query(User).filter(User.id == payload["sub"]).first()
    profile = user.instructor_profile if user else None
    courses = profile.courses if profile else []

    return [
        {
            "id": str(c.id),
            "code": c.code,
            "title": c.title,
            "department": c.department,
            "credits": c.credits,
            "students_enrolled": len(c.enrollments),
            "status": c.status.value,
        }
        for c in courses
    ]


@router.get("/submissions/{assignment_id}")
def get_submissions(
    assignment_id: str,
    payload: dict = Depends(require_role("instructor")),
    db: Session = Depends(get_db),
):
    """Fetch all submissions for an assignment."""
    submissions = db.query(Submission).filter(
        Submission.assignment_id == assignment_id
    ).all()

    result = []
    for sub in submissions:
        # Run AI grading if not already graded
        if sub.ai_grade is None and sub.file_url:
            ai_result = grade_submission(
                submission_text="[document content extracted from file_url]",
                rubric={"correctness": 40, "documentation": 30, "efficiency": 30},
                max_marks=100,
            )
            sub.ai_grade = ai_result["suggested_grade"]
            sub.ai_confidence = ai_result["confidence"]
            sub.ai_feedback = ai_result["feedback"]
            db.commit()

        result.append({
            "submission_id": str(sub.id),
            "student_name": sub.student.full_name,
            "status": sub.status.value,
            "ai_grade": sub.ai_grade,
            "ai_confidence": sub.ai_confidence,
            "ai_feedback": sub.ai_feedback,
            "marks_obtained": sub.marks_obtained,
        })
    return result


@router.post("/submissions/{submission_id}/grade")
def grade_submission_override(
    submission_id: str,
    body: GradeOverrideRequest,
    payload: dict = Depends(require_role("instructor")),
    db: Session = Depends(get_db),
):
    """Instructor overrides or confirms AI grade for a submission."""
    from datetime import datetime

    sub = db.query(Submission).filter(Submission.id == submission_id).first()
    if not sub:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Submission not found")

    sub.marks_obtained = body.marks_obtained
    sub.instructor_feedback = body.instructor_feedback
    sub.status = SubmissionStatus.GRADED
    sub.graded_at = datetime.utcnow()
    db.commit()

    return {"message": "Graded successfully", "marks_obtained": sub.marks_obtained}
