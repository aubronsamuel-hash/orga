from __future__ import annotations

import logging
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI

from .config import settings
from .logging import setup_logging
from .middleware import RequestIdMiddleware
from .routers import health as health_router

setup_logging()
logger = logging.getLogger("app")

@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    logger.info("Application starting")
    yield
    logger.info("Application stopping")

app = FastAPI(title=settings.app_name, lifespan=lifespan)
app.add_middleware(RequestIdMiddleware)

app.include_router(health_router.router, prefix=f"{settings.api_prefix}")
