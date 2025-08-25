#requires -Version 7.0
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
param()

try {
  $p = Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction Stop | Select-Object -First 1
  if ($null -ne $p) {
    $pid = (Get-Process | Where-Object { $_.Id -eq $p.OwningProcess }).Id
    if ($pid) {
      Stop-Process -Id $pid -Force
      Write-Host "Service arrete (PID=$pid)."
      exit 0
    }
  }
  Write-Host "Aucun service ecoute sur 8000."
  exit 0
} catch {
  Write-Error "Erreur lors de l'arret: $($_.Exception.Message)"
  exit 10
}
