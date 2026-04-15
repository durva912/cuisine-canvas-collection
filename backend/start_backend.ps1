$port = 8000

# If another process is already listening on the backend port, stop it first.
$existingPids = @(
  netstat -ano |
    Select-String ":$port\s+.*LISTENING\s+(\d+)$" |
    ForEach-Object { $_.Matches[0].Groups[1].Value } |
    Where-Object { $_ -and $_ -ne "0" } |
    Select-Object -Unique
)

foreach ($processId in $existingPids) {
  Write-Host "Stopping process on port $port (PID: $processId)..."
  taskkill /PID $processId /F | Out-Null
}

Write-Host "Starting backend on http://127.0.0.1:$port"
python -m uvicorn app.main:app --host 127.0.0.1 --port $port
