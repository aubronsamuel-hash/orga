from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter

from ..config import settings

router = APIRouter()

@router.get("/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "app": settings.app_name,
        "version": "0.1.0",
        "time": datetime.now(timezone.utc).isoformat(),
    }
