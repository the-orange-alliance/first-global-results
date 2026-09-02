<#
.SYNOPSIS
    Download any 4x3 flag SVGs that exist in lipis/flag-icons but are missing
    from public/static/flags/4x3/.

.DESCRIPTION
    Lists flags/4x3 in the lipis/flag-icons repo (via the jsDelivr package API,
    falling back to the GitHub contents API), diffs that against the local
    folder, and downloads every *.svg we don't already have from:

        https://raw.githubusercontent.com/lipis/flag-icons/refs/heads/main/flags/4x3/<xy>.svg

    Set $env:GITHUB_TOKEN to use / raise the GitHub API fallback limit (optional).

.PARAMETER DryRun
    List what would be downloaded without writing anything.
#>
[CmdletBinding()]
param(
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$repoRoot   = Split-Path -Parent $PSScriptRoot
$flagsDir   = Join-Path $repoRoot 'public/static/flags/4x3'
$jsdelivrUrl = 'https://data.jsdelivr.com/v1/packages/gh/lipis/flag-icons@main?structure=flat'
$ghApiUrl   = 'https://api.github.com/repos/lipis/flag-icons/contents/flags/4x3'
$rawBase    = 'https://raw.githubusercontent.com/lipis/flag-icons/refs/heads/main/flags/4x3'

if (-not (Test-Path $flagsDir)) { throw "Flags directory not found: $flagsDir" }

# --- List every *.svg in the remote flags/4x3 folder --------------------------
$remoteNames = New-Object System.Collections.Generic.List[string]
try {
    $pkg = Invoke-RestMethod -Uri $jsdelivrUrl -Headers @{ 'User-Agent' = 'flag-updater' }
    foreach ($f in $pkg.files) {
        if ($f.name -match '^/flags/4x3/([^/]+\.svg)$') { $remoteNames.Add($Matches[1]) }
    }
    Write-Host "Remote listing source: jsDelivr" -ForegroundColor DarkGray
}
catch {
    Write-Host "jsDelivr listing failed ($($_.Exception.Message)); falling back to GitHub API" -ForegroundColor Yellow
    $headers = @{ 'User-Agent' = 'flag-updater'; 'Accept' = 'application/vnd.github+json' }
    if ($env:GITHUB_TOKEN) { $headers['Authorization'] = "Bearer $($env:GITHUB_TOKEN)" }
    $page = 1
    while ($true) {
        $resp = Invoke-RestMethod -Uri "$ghApiUrl`?per_page=100&page=$page" -Headers $headers
        if (-not $resp -or $resp.Count -eq 0) { break }
        foreach ($item in $resp) {
            if ($item.type -eq 'file' -and $item.name -like '*.svg') { $remoteNames.Add($item.name) }
        }
        if ($resp.Count -lt 100) { break }
        $page++
    }
}
Write-Host "Remote 4x3 flags in lipis/flag-icons: $($remoteNames.Count)" -ForegroundColor Cyan

# --- What do we already have? -------------------------------------------------
$localNames = [System.Collections.Generic.HashSet[string]]::new(
    [System.StringComparer]::OrdinalIgnoreCase)
Get-ChildItem -Path $flagsDir -Filter '*.svg' -File |
    ForEach-Object { $localNames.Add($_.Name) | Out-Null }
Write-Host "Local 4x3 flags: $($localNames.Count)" -ForegroundColor Cyan

$missing = $remoteNames | Where-Object { -not $localNames.Contains($_) } | Sort-Object

if (-not $missing) {
    Write-Host "`nNothing to do - every remote 4x3 flag already exists locally." -ForegroundColor Green
    return
}

Write-Host "`nMissing flags to download: $($missing.Count)" -ForegroundColor Yellow

# --- Download the missing ones ----------------------------------------------
$downloaded = New-Object System.Collections.Generic.List[string]
$failed     = New-Object System.Collections.Generic.List[string]

foreach ($name in $missing) {
    $url  = "$rawBase/$name"
    $dest = Join-Path $flagsDir $name

    if ($DryRun) {
        Write-Host "[dry-run] would download $name  <-  $url"
        $downloaded.Add($name)
        continue
    }

    try {
        $content = (Invoke-WebRequest -Uri $url -UseBasicParsing -Headers @{ 'User-Agent' = 'flag-updater' }).Content
        if ($content -notmatch '(?is)<svg[\s>]') {
            $failed.Add("$name (remote is not an SVG)")
            Write-Host "  FAIL  $name  (remote is not an SVG)" -ForegroundColor Red
            continue
        }
        [System.IO.File]::WriteAllText($dest, $content, (New-Object System.Text.UTF8Encoding($false)))
        $downloaded.Add($name)
        Write-Host "  ok    $name" -ForegroundColor Green
    }
    catch {
        $failed.Add("$name ($($_.Exception.Message))")
        Write-Host "  FAIL  $name  -> $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "==================== Summary ====================" -ForegroundColor Cyan
Write-Host ("  Downloaded : {0}" -f $downloaded.Count)
Write-Host ("  Failed     : {0}" -f $failed.Count)
if ($downloaded.Count) {
    Write-Host ("  New flags  : {0}" -f ($downloaded -join ', '))
}
if ($failed.Count) {
    Write-Host "  Failures:" -ForegroundColor Red
    $failed | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
    exit 1
}
