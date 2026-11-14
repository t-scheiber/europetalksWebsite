param(
  [Parameter(Mandatory=$true)][int]$PrNumber,
  [string]$Repo = "t-scheiber/europetalksWebsite",
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-Location "d:\Code\europetalksWebsite"

Write-Host "`n========== PR #$PrNumber =========="

git checkout main
git pull origin main

# Try direct merge first
$result = gh pr merge $PrNumber -R $Repo --squash 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Host "Merged directly: PR #$PrNumber"
  return
}
Write-Host "Direct merge failed, resolving conflicts..."

gh pr checkout $PrNumber
git fetch origin main
git rebase origin/main

if ($LASTEXITCODE -ne 0) {
  # Resolve conflicts in package.json and bun.lock
  if (Test-Path package.json) {
    $content = Get-Content package.json -Raw
    if ($content -match '<<<<<<<') {
      # For package.json: manually fix - take PR version for deps being updated, main for others
      git checkout --theirs package.json
      git add package.json
    }
  }
  if (Test-Path bun.lock) {
    git checkout --theirs bun.lock 2>$null
    git add bun.lock 2>$null
  }
  bun install
  git add package.json bun.lock
  git -c core.editor=true rebase --continue
}

bun install
if (-not $SkipBuild) {
  bun run lint
  bun run build
}

git push --force-with-lease origin HEAD

Write-Host "Waiting for CI..."
gh pr checks $PrNumber -R $Repo --watch

$result = gh pr merge $PrNumber -R $Repo --squash 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Host "Merged: PR #$PrNumber"
} else {
  Write-Host "FAILED to merge PR #$PrNumber : $result"
  exit 1
}
