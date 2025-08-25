#requires -Version 7.0
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
param()

$root = Split-Path -Parent $PSCommandPath
$repo = Split-Path -Parent $root
$backend = Join-Path $repo "backend"
$venv = Join-Path $backend ".venv"

if (-not (Test-Path $venv)) { python -m venv $venv }
$python = Join-Path $venv "Scripts/python.exe"
$pip = Join-Path $venv "Scripts/pip.exe"

& $pip install -q -r (Join-Path $backend "requirements.txt") -r (Join-Path $backend "requirements-dev.txt")

Write-Host "Ruff..."
& $python -m ruff check $backend

Write-Host "Mypy..."
& $python -m mypy $backend

Write-Host "Pytest..."
$env:PYTHONPATH = $repo
& $python -m pytest

Write-Host "pip-audit (non bloquant pour l'instant)..."
try { & $python -m pip_audit --progress-spinner=off } catch { Write-Warning "pip-audit a echoue: $($_.Exception.Message)" }
