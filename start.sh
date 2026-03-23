#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# NotesApp — Start Script
# Starts both the .NET backend and Angular frontend
# Usage: ./start.sh
# ─────────────────────────────────────────────────────────────
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo ""
echo "╔════════════════════════════════════╗"
echo "║        NotesApp — Starting         ║"
echo "╚════════════════════════════════════╝"
echo ""

# ── Backend ──────────────────────────────────────────────────
echo "▸ [1/2] Starting .NET backend..."
cd "$ROOT_DIR/backend/NotesApp"

echo "  → Restoring NuGet packages..."
dotnet restore

echo "  → Applying database migrations..."
dotnet ef database update

echo "  → Launching backend on http://localhost:5017"
dotnet run &
BACKEND_PID=$!

# Wait for backend to be ready
echo "  → Waiting for backend to be ready..."
sleep 5

# ── Frontend ─────────────────────────────────────────────────
echo ""
echo "▸ [2/2] Starting Angular frontend..."
cd "$ROOT_DIR/frontend"

echo "  → Installing npm dependencies..."
npm install

echo "  → Launching frontend on http://localhost:3000"
ng serve --proxy-config proxy.conf.json --port 3000 --open &
FRONTEND_PID=$!

# ── Cleanup on exit ──────────────────────────────────────────
trap "echo ''; echo 'Shutting down...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT INT TERM

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║  ✓ Backend  → http://localhost:5017/swagger        ║"
echo "║  ✓ Frontend → http://localhost:3000                ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""
echo "Press Ctrl+C to stop both servers."
echo ""

# Keep script alive
wait
