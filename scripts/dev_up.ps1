#requires -Version 7.0
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
param()

$root = Split-Path -Parent $PSCommandPath
$repo = Split-Path -Parent $root
$backend = Join-Path $repo "backend"
$venv = Join-Path $backend ".venv"

if (-not (Test-Path $venv)) {
  Write-Host "Creation de l'environnement virtuel..." 
  python -m venv $venv
}

$python = Join-Path $venv "Scripts/python.exe"
$pip = Join-Path $venv "Scripts/pip.exe"

& $pip install -q -r (Join-Path $backend "requirements.txt") -r (Join-Path $backend "requirements-dev.txt")

$env:PYTHONPATH = $repo
$env:APP_NAME = ${env:APP_NAME} ? ${env:APP_NAME} : "Orga.com"
$env:DB_DSN = ${env:DB_DSN} ? ${env:DB_DSN} : "sqlite:///./orga_dev.db"

# Alembic (best-effort)
try {
  & $python -m alembic -c (Join-Path $backend "alembic.ini") upgrade head
} catch {
  Write-Warning "Alembic non configure completement: $($_.Exception.Message)"
}

Write-Host "Lancement Uvicorn sur http://127.0.0.1:8000 ..."
& (Join-Path $venv "Scripts/python.exe") -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
