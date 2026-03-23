#!/usr/bin/env bash
# ─────────────────────────────────────────────
# NoteKeeper Frontend — Start Script
# Requires: Node.js 18+, npm 9+
# ─────────────────────────────────────────────
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "▸ Installing dependencies..."
npm install

echo "▸ Starting dev server on http://localhost:4200"
echo "  (API proxy → http://localhost:5000)"
npm start
