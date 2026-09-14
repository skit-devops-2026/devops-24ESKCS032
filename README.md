# SmartHome — Home Automation Dashboard

A full-stack home automation system for managing smart devices (lights, fans, thermostats, locks, plugs) across multiple rooms, with automation rules, usage analytics, and real-time WebSocket updates.

---

## 📌 Status

| Week | Focus | Status |
|------|-------|--------|
| 1 | Static frontend UI shell (mock data) | ✅ Complete |
| 2 | Interactive device cards + room views | 🔜 |
| 3 | Auth UI + global state + API service layer (mocked) | 🔜 |
| 4 | Automation rules UI + analytics charts (mocked) | 🔜 |
| 5 | Spring Boot setup + DB schema + real CRUD APIs | 🔜 |
| 6 | Auth & security (JWT, roles) | 🔜 |
| 7 | WebSocket real-time layer + device simulation engine | 🔜 |
| 8 | Automation rules engine (backend logic) | 🔜 |
| 9 | Analytics backend + notifications | 🔜 |
| 10 | Testing, Docker, deployment, documentation | 🔜 |

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v3, Recharts, STOMP.js / SockJS |
| Backend | Java 21, Spring Boot 3.3, Spring Security (JWT), Spring WebSocket |
| Database | PostgreSQL 16 |
| Scheduling | Spring `@Scheduled` |
| Deployment | Docker Compose, Vercel (frontend), Render/Railway (backend) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Java 21+
- Docker (optional, for full-stack)

### Frontend (Week 1 — fully functional with mock data)
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

**Demo accounts (no signup needed):**
- Click **"Login as Admin"** — full access
- Click **"Login as User"** — standard access

### Backend (Week 5+)
```bash
cd backend
./mvnw spring-boot:run
```

### PostgreSQL only (Docker)
```bash
docker-compose up postgres
```

### Full stack (Week 10+)
```bash
docker-compose up --build
```

---

## 🗂️ Project Structure

```
smart-home/
├── frontend/                   # React + TypeScript app (Vite)
│   └── src/
│       ├── components/
│       │   ├── devices/        # DeviceCard, DeviceIcon
│       │   ├── rooms/          # RoomCard
│       │   ├── automation/     # RuleCard
│       │   ├── notifications/  # NotificationItem
│       │   ├── layout/         # Sidebar, TopBar, AppLayout
│       │   └── ui/             # Button, Card, Toggle, Badge, Modal
│       ├── pages/              # Dashboard, Rooms, RoomDetail, Automation, Analytics, Notifications, Settings, Login
│       ├── context/            # AuthContext, DeviceContext
│       ├── mock/               # data.ts — rich mock dataset
│       ├── types/              # Shared TypeScript interfaces
│       └── lib/                # utils.ts, time.ts
├── backend/                    # Spring Boot app (placeholder, Week 5)
│   ├── pom.xml
│   └── src/main/java/io/smarthome/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── model/
│       ├── security/
│       ├── websocket/
│       └── dto/
├── docker-compose.yml
└── README.md
```

---

## 🗺️ Data Model

```
User ──< Home ──< Room ──< Device ──< DeviceLog
                              │
                              └──< AutomationRule
```

| Entity | Key Fields |
|--------|-----------|
| User | id, name, email, password, role (ADMIN/USER) |
| Home | id, name, owner |
| Room | id, name, home, icon |
| Device | id, name, type (LIGHT/FAN/THERMOSTAT/LOCK/PLUG), state (JSON), room |
| DeviceLog | id, device, previousState, newState, triggeredBy, timestamp |
| AutomationRule | id, condition, action, enabled, lastTriggered |

---

## 📄 License

MIT
