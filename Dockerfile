# ==============================================================================
# Multi-stage production Dockerfile for SmartHome Web Dashboard (M5)
# ==============================================================================

# Stage 1: Build stage with Node.js LTS
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies using clean install
COPY frontend/package*.json ./
RUN npm ci

# Copy application source code and build production bundle
COPY frontend/ ./
RUN npm run build

# Stage 2: Production runtime stage with lightweight Nginx
FROM nginx:alpine

# Copy built static artifacts
COPY --from=build /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Environment variables
ENV PORT=80
ENV NODE_ENV=production

# Expose HTTP port
EXPOSE 80

# Container healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
