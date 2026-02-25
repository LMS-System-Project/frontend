from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, field_validator


# ── Auth Schemas ──────────────────────────────────────────────

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    role: str
    user_id: str
    full_name: str


class RefreshRequest(BaseModel):
    refresh_token: str


# ── User Schemas ──────────────────────────────────────────────

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str
    department: Optional[str] = None


class UserCreate(UserBase):
    password: str

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        return v


class UserOut(UserBase):
    id: UUID
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Student Schemas ───────────────────────────────────────────

class StudentProfileOut(BaseModel):
    enrollment_number: str
    year_of_study: int
    cgpa: Optional[float]
    total_credits: int
    attendance_percentage: float
    drop_risk_score: float

    model_config = {"from_attributes": True}


class StudentDashboardResponse(BaseModel):
    user: UserOut
    profile: StudentProfileOut
    courses_enrolled: int
    assignments_due: int
    completion_rate: float


# ── Course Schemas ────────────────────────────────────────────

class CourseBase(BaseModel):
    code: str
    title: str
    description: Optional[str] = None
    department: str
    credits: int
    semester: str


class CourseCreate(CourseBase):
    pass


class CourseOut(CourseBase):
    id: UUID
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Assignment Schemas ────────────────────────────────────────

class AssignmentBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: datetime
    max_marks: int = 100


class AssignmentCreate(AssignmentBase):
    course_id: UUID


class AssignmentOut(AssignmentBase):
    id: UUID
    course_id: UUID
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Submission Schemas ────────────────────────────────────────

class SubmissionOut(BaseModel):
    id: UUID
    assignment_id: UUID
    status: str
    marks_obtained: Optional[float]
    ai_grade: Optional[float]
    ai_confidence: Optional[float]
    ai_feedback: Optional[str]
    instructor_feedback: Optional[str]
    submitted_at: Optional[datetime]

    model_config = {"from_attributes": True}


class GradeOverrideRequest(BaseModel):
    marks_obtained: float
    instructor_feedback: Optional[str] = None


# ── Admin Dashboard Schemas ───────────────────────────────────

class AdminDashboardResponse(BaseModel):
    total_students: int
    total_instructors: int
    active_courses: int
    active_sessions: int
    at_risk_count: int
    system_status: str = "operational"


# ── AI Module Schemas ─────────────────────────────────────────

class AIGradingResponse(BaseModel):
    submission_id: UUID
    suggested_grade: float
    confidence: float
    feedback: str
    rubric_scores: dict


class CareerRecommendation(BaseModel):
    career_path: str
    match_percentage: float
    skill_gaps: list[str]
    recommended_courses: list[str]
    salary_range: str
