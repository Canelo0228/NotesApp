# NotesApp — Full Stack Notes Application

A simple web application to create, edit, archive, and manage notes.
Built with **Angular 20** (frontend) and **.NET 10** (backend).

---

## ⚠️ Important Note on Compatibility

This project was developed and tested on **Windows 10**.
The database uses **SQL Server Express with Windows Authentication (Integrated Security)**.
To run on Linux/macOS, the connection string in `backend/NotesApp/appsettings.json` must be updated to point to an accessible SQL Server instance with username/password credentials, or the database provider must be replaced with SQLite.

---

## Architecture & Design Patterns

This project follows **Clean Architecture**, separating concerns into independent layers:

| Layer | Project | Responsibility |
|---|---|---|
| API | `NotesApp` | HTTP controllers, request/response handling |
| Application | `NotesApp.Core.Application` | Business logic, interfaces, DTOs |
| Domain | `NotesApp.Core.Domain` | Entities, core business rules |
| Infrastructure | `NotesApp.Infrastructure.Persistence` | EF Core, database, repositories |

**Design patterns used:**

- **Repository Pattern** — `INoteRepository` abstracts all data access, decoupling the application layer from the database implementation
- **Service Layer Pattern** — `INoteService` / `NoteService` encapsulates business logic, keeping controllers thin
- **DTO Pattern** — `NoteDTO` and `NoteStatusDTO` separate the API contract from the domain model
- **Dependency Injection** — all dependencies are injected via constructor throughout all layers
- **Decorator Pattern** — `HttpInterceptor` in Angular decorates outgoing HTTP requests to handle errors globally without modifying individual service calls
- **AutoMapper** — automatic mapping between domain entities and DTOs via `GeneralProfile`
- **SOLID Principles** — applied throughout the backend: Single Responsibility (each class has one purpose), Open/Closed (interfaces allow extension without modification), Liskov Substitution (service/repository implementations are interchangeable with their interfaces), Interface Segregation (INoteService and INoteRepository are focused contracts), Dependency Inversion (high-level modules depend on abstractions, not concretions)

---

## Runtimes & Tools

| Tool | Version |
|---|---|
| Node.js | 22.16.0 |
| npm | 10.9.2 |
| Angular CLI | 20.0.0 |
| .NET SDK | 10.0.102 |
| SQL Server Express | 2019+ (SQLEXPRESS instance) |
| OS tested on | Windows 10 |

---

## Project Structure

```
/
├── README.md
├── start.sh
├── .gitignore
├── backend/
│   ├── NotesApp/                               → API entry point
│   │   ├── Controllers/
│   │   │   └── NoteController.cs               → REST endpoints
│   │   ├── Properties/
│   │   │   └── launchSettings.json
│   │   ├── appsettings.json                    → Connection string & frontend URL config
│   │   ├── Program.cs                          → App bootstrap, DI, CORS setup
│   │   └── NotesApp.http
│   ├── NotesApp.Core.Application/              → Application layer
│   │   ├── DTOs/Note/
│   │   │   ├── NoteDTO.cs
│   │   │   ├── NoteStatusDTO.cs
│   │   │   └── SaveNoteDTO.cs
│   │   ├── Interfaces/
│   │   │   ├── Repositories/
│   │   │   │   └── INoteRepository.cs
│   │   │   └── Services/
│   │   │       └── INoteService.cs
│   │   ├── Mappings/
│   │   │   └── GeneralProfile.cs               → AutoMapper profiles
│   │   ├── Services/
│   │   │   └── NoteService.cs
│   │   └── ServiceRegistration.cs
│   ├── NotesApp.Core.Domain/                   → Domain layer
│   │   └── Entities/
│   │       └── Note.cs                         → Note entity
│   └── NotesApp.Infrastructure.Persistence/    → Infrastructure layer
│       ├── Contexts/
│       │   └── ApplicationContext.cs           → EF Core DbContext
│       ├── Migrations/                         → EF Core migrations (pre-generated)
│       ├── Repositories/
│       │   └── NoteRepository.cs
│       └── ServiceRegistration.cs
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── core/
    │   │   │   ├── interceptors/
    │   │   │   │   └── error.interceptor.ts    → Decorator pattern: global HTTP error handling
    │   │   │   ├── models/
    │   │   │   │   └── note.model.ts           → Note, CreateNoteRequest, UpdateNoteRequest
    │   │   │   └── services/
    │   │   │       ├── note.service.ts         → API calls
    │   │   │       └── toast.service.ts        → Notification service
    │   │   ├── features/
    │   │   │   └── notes/
    │   │   │       ├── components/
    │   │   │       │   ├── note-card/          → Individual note card with actions
    │   │   │       │   └── note-form/          → Create/Edit modal form
    │   │   │       └── pages/
    │   │   │           ├── active-notes/       → Route: /notes
    │   │   │           └── archived-notes/     → Route: /archived
    │   │   ├── shared/
    │   │   │   └── components/
    │   │   │       ├── confirm-dialog/         → Delete confirmation modal
    │   │   │       ├── empty-state/            → Empty list placeholder
    │   │   │       ├── header/                 → Navigation bar
    │   │   │       ├── loading-spinner/        → Loading indicator
    │   │   │       └── toast-container/        → Toast notifications
    │   │   ├── app.component.ts
    │   │   ├── app.config.ts
    │   │   └── app.routes.ts
    │   ├── environments/
    │   │   ├── environment.ts                  → Dev config (apiUrl: '/api')
    │   │   └── environment.prod.ts
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.scss                         → Global design tokens
    ├── proxy.conf.json                         → Proxies /api → backend during development
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

---

## Requirements

Before running the app, make sure you have installed:

- [Node.js 22+](https://nodejs.org)
- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) with a local instance named `SQLEXPRESS`
- Angular CLI: `npm install -g @angular/cli`

---

## Database Setup

The app uses **SQL Server Express** with Windows Authentication (no username/password needed).

Connection string in `backend/NotesApp/appsettings.json`:

```json
"ConnectionStrings": {
  "ConnectionString": "Data Source=.\\SQLEXPRESS;Initial Catalog=NotesApp;Integrated Security=True;TrustServerCertificate=True"
}
```

Migrations are **pre-generated** and included in the repository under `backend/NotesApp.Infrastructure.Persistence/Migrations/`.
The database schema is applied automatically on startup — no manual migration commands required.

---

## Running with Docker (Recommended)

The easiest way to run the app with a single command, no additional tools required except Docker.

### Requirements
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Start
```bash
docker-compose up --build
```

- Frontend → http://localhost:3000
- Backend/Swagger → http://localhost:5017/swagger

The database is created and migrations are applied automatically on first run.

### Stop
```bash
docker-compose down
```

To also delete the database volume:
```bash
docker-compose down -v
```

---

## Running Locally (Without Docker)

### Option 1 — One command (Linux/macOS)

```bash
./start.sh
```

### Option 2 — Manual (Windows)

**Backend** — open a terminal in the `backend/NotesApp` folder:

```bash
dotnet restore
dotnet run
```

Backend available at: `http://localhost:5017`
Swagger UI at: `http://localhost:5017/swagger`

**Frontend** — open a second terminal in the `frontend` folder:

```bash
npm install
ng serve --proxy-config proxy.conf.json --port 3000 -o
```

Frontend available at: `http://localhost:3000`

---

## API Endpoints (Phase 1)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/note` | List active notes |
| GET | `/api/note/archived` | List archived notes |
| POST | `/api/note` | Create a note |
| PUT | `/api/note/{id}` | Update a note |
| DELETE | `/api/note/{id}` | Delete a note |
| PATCH | `/api/note/{id}/status` | Archive / unarchive a note |

---

## Features — Phase 1

- Create, edit, and delete notes
- Archive and unarchive notes
- View active notes list
- View archived notes list
- Toast notifications for all operations
- Global HTTP error handling via interceptor

---

## Login

This application does not require login. No authentication is implemented in Phase 1.
