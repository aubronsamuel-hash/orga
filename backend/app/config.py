from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Orga.com"
    api_prefix: str = "/api/v1"
    host: str = "127.0.0.1"
    port: int = 8000
    db_dsn: str = "sqlite:///./orga_dev.db"
    environment: str = "dev"

    model_config = SettingsConfigDict(env_prefix="", env_file=None, extra="ignore")

settings = Settings()
