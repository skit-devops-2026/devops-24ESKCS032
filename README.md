# SmartHome — Home Automation Dashboard

SmartHome is a modular IoT home automation platform designed for real-time monitoring and control of connected appliances, room environments, and scheduled automation routines.

## Author

| Roll No. | Name | GitHub username |
|---|---|---|
| 24ESKCS032 | Akshat Bhatt | akshatx11 |

## About

SmartHome is an automated IoT home management dashboard for monitoring and controlling smart appliances in real-time. It features interactive room views, rule automation, energy analytics, and WebSocket event synchronization. Built with high reliability for local and distributed smart home networks.

## Tech stack

- Frontend: React 19, TypeScript, Vite, Tailwind CSS
- Backend: Java 21, Spring Boot 3.3
- Database: PostgreSQL 16

## Running locally

```bash
make install
make run
```

## Live Demo

https://smarthome-dashboard-24eskcs032.onrender.com

## Live URL

https://smarthome-dashboard-24eskcs032.onrender.com

## DevOps Infrastructure (M5, M6, M7)

### M5 — Containerization
- **Dockerfile**: Production multi-stage Docker build with Node.js LTS builder and optimized Nginx runtime.
- **Docker Compose**: `docker compose up --build` launches PostgreSQL 16, Spring Boot backend, and React dashboard with health checks.
- **Registry**: GitHub Container Registry (`ghcr.io/skit-devops-2026/devops-24ESKCS032-frontend:latest`).

### M6 — Deployment & Monitoring
- **Live Deployment**: Render cloud platform hosting containerized dashboard.
- **Prometheus**: Configuration located at `monitoring/prometheus.yml` scraping Spring Boot Actuator at `/actuator/prometheus`.
- **Grafana Dashboard**: Committed at `monitoring/dashboard.json` monitoring availability, CPU, memory, throughput, and latency.

### M7 — Kubernetes
- **Deployment Manifest**: `k8s/deployment.yaml` with 2 replicas, probes, and resource constraints referencing the GHCR image.
- **Service Manifest**: `k8s/service.yaml` exposing the application via NodePort (30080).

## Health endpoint

`GET /api/health` returns the running health check confirmation message.
