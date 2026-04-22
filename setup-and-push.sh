#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# setup-and-push.sh
#
# One-shot script to:
#   1. Remove the stale .git dir (created by the Cowork sandbox)
#   2. Initialize a fresh git repo based on origin/main
#   3. Put all planning docs on a branch named `chore/initial-planning-docs`
#   4. Push the branch and (optionally) open a PR
#
# Run from the project folder:
#   cd ~/Documents/shahnawaz-profile
#   bash setup-and-push.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REMOTE_URL="https://github.com/mshanawaz114/shahnawaz-profile.git"
BRANCH="chore/initial-planning-docs"

echo "→ Removing stale .git/ (may prompt for sudo on first run)"
if [ -d .git ]; then
  rm -rf .git 2>/dev/null || sudo rm -rf .git
fi

echo "→ Initializing fresh git repo"
git init -b main -q

echo "→ Connecting to remote"
git remote add origin "$REMOTE_URL"
git fetch origin main -q

echo "→ Basing work on origin/main"
git reset --soft origin/main

echo "→ Creating branch $BRANCH"
git checkout -b "$BRANCH"

echo "→ Staging files"
git add -A

echo "→ Committing"
git commit -m "chore: add initial planning docs (README, CLAUDE.md, INSTRUCTIONS, ideas, .gitignore)"

echo "→ Pushing branch to origin"
git push -u origin "$BRANCH"

echo ""
echo "✓ Done. Branch pushed."
echo ""
echo "Next step — open a PR:"
echo "  • via gh CLI:  gh pr create --fill --base main --head $BRANCH --web"
echo "  • via browser: https://github.com/mshanawaz114/shahnawaz-profile/compare/main...$BRANCH"
