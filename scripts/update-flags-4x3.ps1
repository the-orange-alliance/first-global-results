<#
.SYNOPSIS
    Download fresh 4x3 flag SVGs from lipis/flag-icons for every flag that has
    NOT already been updated in the current working tree.

.DESCRIPTION
    Looks at `git status` for public/static/flags/4x3/. Any *.svg in that folder
    that is NOT already showing as modified/added is (re)downloaded from:

        https://raw.githubusercontent.com/lipis/flag-icons/refs/heads/main/flags/4x3/<xy>.svg

    where <xy> is the file's base name (e.g. "us", "gb-eng").

    Files whose remote counterpart does not exist (custom flags such as
    10_hope.svg, 15.svg, qz.jpg) are reported and skipped.

.PARAMETER DryRun
    List what would be downloaded without writing anything.
#>
[CmdletBinding()]
param(
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$repoRoot  = Split-Path -Parent $PSScriptRoot
$flagsRel  = 'public/static/flags/4x3'
$flagsDir  = Join-Path $repoRoot $flagsRel
$baseUrl   = 'https://raw.githubusercontent.com/lipis/flag-icons/refs/heads/main/flags/4x3'

if (-not (Test-Path $flagsDir)) {
    throw "Flags directory not found: $flagsDir"
}

# --- Which flags are already updated in the working tree? -----------------------
Push-Location $repoRoot
try {
    $porcelain = git status --porcelain -- $flagsRel
} finally {
    Pop-Location
}

$alreadyUpdated = [System.Collections.Generic.HashSet[string]]::new(
    [System.StringComparer]::OrdinalIgnoreCase)

foreach ($line in $porcelain) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    # Format: "XY <path>"  (X = staged, Y = worktree). Handle rename "old -> new".
    $path = $line.Substring(3).Trim().Trim('"')
    if ($path -match '->') { $path = ($path -split '->')[-1].Trim().Trim('"') }
    $alreadyUpdated.Add([System.IO.Path]::GetFileName($path)) | Out-Null
}

Write-Host "Already-updated 4x3 flags in working tree: $($alreadyUpdated.Count)" -ForegroundColor Cyan

# --- Walk every *.svg and refresh the ones not yet touched ---------------------
$svgFiles = Get-ChildItem -Path $flagsDir -Filter '*.svg' -File | Sort-Object Name

$downloaded = New-Object System.Collections.Generic.List[string]
$skippedUpdated = New-Object System.Collections.Generic.List[string]
$missingRemote = New-Object System.Collections.Generic.List[string]
$failed = New-Object System.Collections.Generic.List[string]

foreach ($file in $svgFiles) {
    if ($alreadyUpdated.Contains($file.Name)) {
        $skippedUpdated.Add($file.Name)
        continue
    }

    $code = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $url  = "$baseUrl/$code.svg"

    if ($DryRun) {
        Write-Host "[dry-run] would download $($file.Name)  <-  $url"
        $downloaded.Add($file.Name)
        continue
    }

    try {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -Headers @{ 'User-Agent' = 'flag-updater' }
        $content = $resp.Content
        if ($content -notmatch '(?is)<svg[\s>]') {
            $missingRemote.Add($file.Name)
            Write-Host "  skip  $($file.Name)  (remote is not an SVG)" -ForegroundColor Yellow
            continue
        }
        # Write bytes as-is (UTF-8, no BOM) to match repo style.
        [System.IO.File]::WriteAllText($file.FullName, $content, (New-Object System.Text.UTF8Encoding($false)))
        $downloaded.Add($file.Name)
        Write-Host "  ok    $($file.Name)" -ForegroundColor Green
    }
    catch {
        $status = $null
        if ($_.Exception.Response) { $status = [int]$_.Exception.Response.StatusCode }
        if ($status -eq 404) {
            $missingRemote.Add($file.Name)
            Write-Host "  skip  $($file.Name)  (404 - no remote flag)" -ForegroundColor Yellow
        }
        else {
            $failed.Add("$($file.Name) ($($_.Exception.Message))")
            Write-Host "  FAIL  $($file.Name)  -> $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# --- Summary -----------------------------------------------------------------
Write-Host ""
Write-Host "==================== Summary ====================" -ForegroundColor Cyan
Write-Host ("  Downloaded / refreshed : {0}" -f $downloaded.Count)
Write-Host ("  Skipped (already updated): {0}" -f $skippedUpdated.Count)
Write-Host ("  Skipped (no remote flag): {0}" -f $missingRemote.Count)
Write-Host ("  Failed                  : {0}" -f $failed.Count)
if ($missingRemote.Count) {
    Write-Host ("  No remote: {0}" -f ($missingRemote -join ', ')) -ForegroundColor Yellow
}
if ($failed.Count) {
    Write-Host "  Failures:" -ForegroundColor Red
    $failed | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
    exit 1
}
