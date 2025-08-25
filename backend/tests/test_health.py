from __future__ import annotations

from backend.app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_health_ok() -> None:
    r = client.get("/api/v1/health", headers={"X-Request-ID": "test-rid"})
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "ok"
    assert "app" in data and "version" in data and "time" in data
    assert r.headers.get("X-Request-ID") == "test-rid"

def test_unknown_route_ko() -> None:
    r = client.get("/api/v1/does-not-exist")
    assert r.status_code == 404
