#requires -Version 7.0
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
param()

$uri = "http://127.0.0.1:8000/api/v1/health"
try {
  $r = Invoke-WebRequest -Uri $uri -Headers @{ "X-Request-ID" = "smoke-rid" } -TimeoutSec 5
  Write-Host $r.Content
  exit 0
} catch {
  Write-Error "ERREUR_RESEAU_API: impossible de joindre $uri"
  exit 4
}
