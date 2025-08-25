from __future__ import annotations

from contextvars import ContextVar

_request_id_var: ContextVar[str | None] = ContextVar("request_id", default=None)

def set_request_id(value: str | None) -> None:
    _request_id_var.set(value)

def get_request_id() -> str | None:
    return _request_id_var.get()
