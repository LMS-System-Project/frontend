from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.core.config import settings
from app.api.v1 import auth, student, instructor, admin

# ── Rate Limiter ──────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address, default_limits=[f"{settings.RATE_LIMIT_PER_MINUTE}/minute"])

# ── Application ───────────────────────────────────────────────
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="GradeFlow — Intelligent Academic Management System API",
    docs_url="/api/docs" if settings.DEBUG else None,
    redoc_url="/api/redoc" if settings.DEBUG else None,
)

# Attach rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ── CORS ──────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────
app.include_router(auth.router, prefix="/api/v1")
app.include_router(student.router, prefix="/api/v1")
app.include_router(instructor.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1")


# ── Health Check ──────────────────────────────────────────────
@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "version": settings.APP_VERSION}


@app.get("/api/v1/health", tags=["Health"])
def api_health():
    return {"status": "healthy", "api_version": "v1"}
