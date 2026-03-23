# ── Build stage ──────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# ── Runtime stage (nginx) ─────────────────────────────────────
FROM nginx:alpine AS final

# Copy built Angular app
COPY --from=build /app/dist/notes-app-frontend/browser /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
