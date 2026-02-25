"""
AI Module — Provider-agnostic academic intelligence.

Currently provides stub implementations that can be backed by:
  - OpenAI GPT-4 (AI_PROVIDER=openai)
  - Anthropic Claude (AI_PROVIDER=anthropic)
  - Local models via Ollama (AI_PROVIDER=local)

Each public function accepts standard Python dicts/primitives to remain
decoupled from the database layer.
"""

import json
import uuid
from typing import Optional


# ── Drop-Risk Predictor ───────────────────────────────────────

def predict_drop_risk(
    *,
    cgpa: float,
    attendance_pct: float,
    assignments_missed: int,
    engagement_score: float,  # 0.0 – 1.0 derived from portal activity
) -> dict:
    """
    Returns a risk score (0.0–1.0) and risk level label.

    Production: Replace with a scikit-learn logistic regression model
                trained on historical university dropout data.
    """
    score = 0.0
    if cgpa < 6.0:
        score += 0.4
    elif cgpa < 7.0:
        score += 0.2

    if attendance_pct < 65:
        score += 0.35
    elif attendance_pct < 75:
        score += 0.2

    if assignments_missed > 3:
        score += 0.15

    if engagement_score < 0.3:
        score += 0.1

    score = min(score, 1.0)

    if score >= 0.6:
        level = "High"
    elif score >= 0.35:
        level = "Medium"
    else:
        level = "Low"

    return {"risk_score": round(score, 3), "risk_level": level}


# ── AI Grading Engine ─────────────────────────────────────────

def grade_submission(
    *,
    submission_text: str,
    rubric: dict,
    max_marks: int = 100,
) -> dict:
    """
    Returns AI-suggested grade, rubric-level scores, and feedback.

    Production: Call the configured LLM (OpenAI / Anthropic) with the
                submission text + structured rubric JSON.
    """
    # Stub: simulate grading for demonstration
    suggested_grade = round(max_marks * 0.82, 1)
    confidence = 0.87

    return {
        "submission_id": str(uuid.uuid4()),
        "suggested_grade": suggested_grade,
        "confidence": confidence,
        "feedback": (
            "The submission demonstrates a solid understanding of the core concepts. "
            "The implementation is correct but could benefit from improved inline documentation "
            "and more thorough edge-case handling. Consider using iterative rather than recursive "
            "approaches for improved stack efficiency."
        ),
        "rubric_scores": {k: round(v * 0.82, 1) for k, v in rubric.items()},
    }


# ── Career Recommendation Engine ──────────────────────────────

def generate_career_recommendations(
    *,
    department: str,
    cgpa: float,
    strong_subjects: list[str],
    weak_subjects: list[str],
) -> list[dict]:
    """
    Returns ranked career paths based on academic profile.

    Production: Embed subject scores into a vector and match against a
                curated career-path embedding database.
    """
    base_paths = [
        {
            "career_path": "Machine Learning Engineer",
            "match_percentage": 88.0,
            "skill_gaps": ["Cloud Computing", "Deep Learning", "MLOps"],
            "recommended_courses": ["Advanced ML", "Cloud Architecture", "Data Engineering"],
            "salary_range": "₹18L – ₹35L",
        },
        {
            "career_path": "Software Development Engineer",
            "match_percentage": 92.0,
            "skill_gaps": ["System Design", "Distributed Systems"],
            "recommended_courses": ["System Design", "Database Internals"],
            "salary_range": "₹14L – ₹28L",
        },
        {
            "career_path": "Data Scientist",
            "match_percentage": 75.0,
            "skill_gaps": ["Statistical Modelling", "R Programming", "Business Analytics"],
            "recommended_courses": ["Applied Statistics", "R for Data Science"],
            "salary_range": "₹12L – ₹24L",
        },
    ]

    # Adjust match by CGPA
    for path in base_paths:
        cgpa_factor = (cgpa - 6.0) / 4.0  # normalise 6–10 → 0–1
        path["match_percentage"] = round(
            min(path["match_percentage"] + cgpa_factor * 5, 99.0), 1
        )

    return sorted(base_paths, key=lambda x: x["match_percentage"], reverse=True)


# ── Anomaly Detector ──────────────────────────────────────────

def detect_grade_anomalies(
    *,
    student_id: str,
    semester_grades: list[dict],  # [{"sem": "S1", "gpa": 8.1}, ...]
) -> list[dict]:
    """
    Flags sudden GPA drops or spikes using moving average deviation.

    Returns a list of anomaly dicts (empty if no anomalies detected).
    """
    anomalies = []
    for i in range(1, len(semester_grades)):
        prev = semester_grades[i - 1]["gpa"]
        curr = semester_grades[i]["gpa"]
        delta = curr - prev

        if delta < -1.5:
            anomalies.append({
                "type": "Sudden drop",
                "semester": semester_grades[i]["sem"],
                "delta": delta,
                "severity": "High" if delta < -2.0 else "Medium",
            })
        elif delta > 1.5:
            anomalies.append({
                "type": "Sudden spike",
                "semester": semester_grades[i]["sem"],
                "delta": delta,
                "severity": "Medium",
            })

    return anomalies
