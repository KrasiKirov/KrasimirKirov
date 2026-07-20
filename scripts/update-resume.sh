#!/usr/bin/env bash
#
# Publish a new résumé to the live site.
#
#   ./scripts/update-resume.sh                 # uses the default source below
#   ./scripts/update-resume.sh ~/path/to.pdf   # or point it anywhere
#
# Validates the file, swaps it in, commits, pushes, and then waits until the
# live site actually serves the new bytes — a push alone doesn't prove a deploy
# (Cloudflare/Pages builds can fail silently).

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$REPO/Resume.pdf"
LIVE_URL="https://krasimirkirov.com/Resume.pdf"

# Where your working copy lives. Change this line if you move it.
DEFAULT_SRC="$HOME/Desktop/SE/Kirov,Krasimir_Resume.pdf"
SRC="${1:-$DEFAULT_SRC}"

die() { printf '\033[31m✗ %s\033[0m\n' "$1" >&2; exit 1; }
ok()  { printf '\033[32m✓ %s\033[0m\n' "$1"; }
note(){ printf '  %s\n' "$1"; }

# ---- validate before touching anything ------------------------------------
[ -f "$SRC" ] || die "no file at: $SRC"
[ -r "$SRC" ] || die "file exists but can't be read: $SRC
    macOS blocks some folders (Desktop, Documents, iCloud) per-app.
    Run this from your own Terminal, or grant it Full Disk Access in
    System Settings › Privacy & Security."
HEADER=$(head -c 4 "$SRC" 2>/dev/null) || die "could not read: $SRC (permissions?)"
[ "$HEADER" = "%PDF" ] || die "not a PDF (missing %PDF header): $SRC"

SIZE=$(stat -f%z "$SRC")
[ "$SIZE" -gt 10000 ] || die "suspiciously small (${SIZE} bytes) — is it still exporting?"

if [ -f "$DEST" ] && cmp -s "$SRC" "$DEST"; then
  ok "already up to date — nothing to publish"
  exit 0
fi

OLD_SIZE=0
[ -f "$DEST" ] && OLD_SIZE=$(stat -f%z "$DEST")

note "source:  $SRC"
note "size:    ${OLD_SIZE} → ${SIZE} bytes"

# ---- swap it in ------------------------------------------------------------
# macOS sometimes refuses to overwrite a file in place; fall back to Finder,
# which moves the old one to the Trash (recoverable) rather than destroying it.
if ! cp "$SRC" "$DEST" 2>/dev/null; then
  note "direct copy blocked by macOS — routing through Finder"
  osascript -e "tell application \"Finder\" to delete POSIX file \"$DEST\"" >/dev/null 2>&1 || true
  cp "$SRC" "$DEST" || die "could not write $DEST"
fi
[ "$(stat -f%z "$DEST")" = "$SIZE" ] || die "copy landed at the wrong size — aborting before commit"
ok "copied into the repo"

# ---- commit + push ---------------------------------------------------------
cd "$REPO"
if git diff --quiet -- Resume.pdf && git diff --cached --quiet -- Resume.pdf; then
  ok "git sees no change — nothing to push"
  exit 0
fi

git add Resume.pdf
git commit -q -m "docs(resume): update resume"
git pull --rebase -q
git push -q
ok "pushed to $(git rev-parse --abbrev-ref HEAD)"

# ---- verify it is actually live -------------------------------------------
printf '  waiting for deploy'
for _ in $(seq 1 24); do
  printf '.'
  LIVE=$(curl -s -m 15 -o /dev/null -w '%{size_download}' "$LIVE_URL" 2>/dev/null || echo 0)
  if [ "$LIVE" = "$SIZE" ]; then
    printf '\n'; ok "live at $LIVE_URL (${SIZE} bytes)"
    exit 0
  fi
  sleep 15
done

printf '\n'
die "pushed, but $LIVE_URL still serves the old file — check the Cloudflare Pages build log"
