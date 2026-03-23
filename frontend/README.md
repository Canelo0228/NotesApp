# NoteKeeper — Angular Frontend

A clean, dark-themed SPA built with **Angular 17** for the NotesApp REST API.

## Tech Stack

| Tool | Version |
|---|---|
| Node.js | 18.17+ |
| npm | 9.6+ |
| Angular CLI | 17.3.x |
| TypeScript | 5.4.x |

## Prerequisites

- Node.js ≥ 18.17 — [nodejs.org](https://nodejs.org)
- Angular CLI: `npm install -g @angular/cli@17`
- The **.NET backend** must be running on `http://localhost:5000`

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (with API proxy to localhost:5000)
npm start

# 3. Open browser
open http://localhost:4200
```

## API Proxy

The `proxy.conf.json` file forwards all `/api` requests to `http://localhost:5000` to avoid CORS issues during development. Make sure your backend is configured to listen on port **5000**, or update `proxy.conf.json` accordingly.

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── interceptors/     # HTTP error interceptor
│   │   ├── models/           # TypeScript interfaces (Note, DTOs)
│   │   └── services/         # NoteService, ToastService
│   ├── features/
│   │   └── notes/
│   │       ├── components/
│   │       │   ├── note-card/    # Individual note card
│   │       │   └── note-form/    # Create/Edit modal form
│   │       └── pages/
│   │           ├── active-notes/   # Route: /notes
│   │           └── archived-notes/ # Route: /archived
│   └── shared/
│       └── components/
│           ├── confirm-dialog/   # Delete confirmation modal
│           ├── empty-state/      # Empty list placeholder
│           ├── header/           # App navigation bar
│           ├── loading-spinner/  # Loading indicator
│           └── toast-container/  # Notification toasts
├── environments/
│   ├── environment.ts        # Dev (apiUrl: '/api')
│   └── environment.prod.ts   # Prod
└── styles.scss               # Global design tokens + utilities
```

## Features (Phase 1)

- ✅ **Create** notes with title and content
- ✅ **Edit** notes via modal form
- ✅ **Delete** notes with confirmation dialog
- ✅ **Archive** active notes
- ✅ **Unarchive** notes from the Archive view
- ✅ **List active** notes at `/notes`
- ✅ **List archived** notes at `/archived`
- ✅ Toast notifications for all operations
- ✅ Error handling with user-friendly messages

## Build for Production

```bash
ng build --configuration production
```

Output will be in `dist/notes-app-frontend/`.

## Backend Endpoints Consumed

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notes` | List active notes |
| GET | `/api/notes/archived` | List archived notes |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |
| PATCH | `/api/notes/:id/archive` | Archive / unarchive note |
