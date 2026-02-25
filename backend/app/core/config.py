from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App
    APP_NAME: str = "GradeFlow API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    API_PREFIX: str = "/api"

    # Database
    DATABASE_URL: str = "postgresql://gradeflow:gradeflow@localhost:5432/gradeflow"

    # JWT
    SECRET_KEY: str = "change-me-in-production-use-256-bit-random-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # CORS
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
        "https://gradeflow.university.edu",
    ]

    # Rate limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    RATE_LIMIT_AUTH_PER_MINUTE: int = 10

    # AI (provider-agnostic)
    AI_PROVIDER: str = "openai"  # openai | anthropic | local
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
