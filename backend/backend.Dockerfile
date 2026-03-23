# ── Build stage ──────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["NotesApp/NotesAPI.csproj", "NotesApp/"]
COPY ["NotesApp.Core.Application/NotesApp.Core.Application.csproj", "NotesApp.Core.Application/"]
COPY ["NotesApp.Core.Domain/NotesApp.Core.Domain.csproj", "NotesApp.Core.Domain/"]
COPY ["NotesApp.Infrastructure.Persistence/NotesApp.Persistence.Infrastructure.csproj", "NotesApp.Infrastructure.Persistence/"]

RUN dotnet restore "NotesApp/NotesAPI.csproj"

# Copy everything and build
COPY . .
WORKDIR /src/NotesApp
RUN dotnet build "NotesAPI.csproj" -c Release -o /app/build

# ── Publish stage ─────────────────────────────────────────────
FROM build AS publish
RUN dotnet publish "NotesAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# ── Runtime stage ─────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 5017

ENTRYPOINT ["dotnet", "NotesAPI.dll"]
