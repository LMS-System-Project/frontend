import enum
import uuid
from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


# ── Enums ─────────────────────────────────────────────────────

class RoleEnum(str, enum.Enum):
    STUDENT = "student"
    INSTRUCTOR = "instructor"
    ADMIN = "admin"


class SubmissionStatus(str, enum.Enum):
    PENDING = "pending"
    SUBMITTED = "submitted"
    GRADED = "graded"


class CourseStatus(str, enum.Enum):
    ACTIVE = "active"
    DRAFT = "draft"
    ARCHIVED = "archived"


# ── User ──────────────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)
    avatar_url = Column(String(512), nullable=True)
    department = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    student_profile = relationship("StudentProfile", back_populates="user", uselist=False)
    instructor_profile = relationship("InstructorProfile", back_populates="user", uselist=False)
    submissions = relationship("Submission", back_populates="student")
    enrollments = relationship("Enrollment", back_populates="student")


# ── Profiles ──────────────────────────────────────────────────

class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True)
    enrollment_number = Column(String(20), unique=True, nullable=False)
    year_of_study = Column(Integer, nullable=False, default=1)
    cgpa = Column(Float, nullable=True)
    total_credits = Column(Integer, default=0)
    attendance_percentage = Column(Float, default=100.0)
    drop_risk_score = Column(Float, default=0.0)  # 0.0 – 1.0

    user = relationship("User", back_populates="student_profile")
    grade_history = relationship("GradeHistory", back_populates="student")


class InstructorProfile(Base):
    __tablename__ = "instructor_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True)
    employee_id = Column(String(20), unique=True, nullable=False)
    designation = Column(String(100), nullable=True)
    average_rating = Column(Float, default=0.0)

    user = relationship("User", back_populates="instructor_profile")
    courses = relationship("Course", back_populates="instructor")


# ── Courses ───────────────────────────────────────────────────

class Course(Base):
    __tablename__ = "courses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String(20), unique=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    department = Column(String(100), nullable=False)
    credits = Column(Integer, nullable=False)
    semester = Column(String(20), nullable=False)
    status = Column(Enum(CourseStatus), default=CourseStatus.DRAFT)
    instructor_id = Column(UUID(as_uuid=True), ForeignKey("instructor_profiles.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    instructor = relationship("InstructorProfile", back_populates="courses")
    enrollments = relationship("Enrollment", back_populates="course")
    assignments = relationship("Assignment", back_populates="course")
    content_items = relationship("ContentItem", back_populates="course")


# ── Enrollments ───────────────────────────────────────────────

class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id"))
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    progress = Column(Float, default=0.0)
    final_grade = Column(String(5), nullable=True)

    student = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")


# ── Assignments ───────────────────────────────────────────────

class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id"))
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    due_date = Column(DateTime, nullable=False)
    max_marks = Column(Integer, default=100)
    created_at = Column(DateTime, default=datetime.utcnow)

    course = relationship("Course", back_populates="assignments")
    submissions = relationship("Submission", back_populates="assignment")


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    assignment_id = Column(UUID(as_uuid=True), ForeignKey("assignments.id"))
    student_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    file_url = Column(String(512), nullable=True)
    status = Column(Enum(SubmissionStatus), default=SubmissionStatus.PENDING)
    marks_obtained = Column(Float, nullable=True)
    ai_grade = Column(Float, nullable=True)
    ai_confidence = Column(Float, nullable=True)
    ai_feedback = Column(Text, nullable=True)
    instructor_feedback = Column(Text, nullable=True)
    submitted_at = Column(DateTime, nullable=True)
    graded_at = Column(DateTime, nullable=True)

    assignment = relationship("Assignment", back_populates="submissions")
    student = relationship("User", back_populates="submissions")


# ── Grade History ─────────────────────────────────────────────

class GradeHistory(Base):
    __tablename__ = "grade_history"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("student_profiles.id"))
    semester = Column(String(20), nullable=False)
    gpa = Column(Float, nullable=False)
    credits_completed = Column(Integer, default=0)
    recorded_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("StudentProfile", back_populates="grade_history")


# ── Content Items ─────────────────────────────────────────────

class ContentItem(Base):
    __tablename__ = "content_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id"))
    title = Column(String(255), nullable=False)
    content_type = Column(String(20), nullable=False)  # video | document | quiz
    file_url = Column(String(512), nullable=True)
    file_size_mb = Column(Float, nullable=True)
    is_published = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    course = relationship("Course", back_populates="content_items")
