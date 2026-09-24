# Every team fills in the commands for their own stack.
# The CI pipeline calls these targets, so the names must not change.
#
# Examples:
#   Node    install: npm ci          test: npm test        build: npm run build
#   Python  install: pip install -r requirements.txt
#                                    test: pytest          build: echo "no build step"
#   Java    install: ./mvnw -B dependency:go-offline
#                                    test: ./mvnw test     build: ./mvnw package

.PHONY: install test build run docker-build docker-up

install:
	cd frontend && npm ci
	cd backend && mvn dependency:resolve -B || true

test:
	cd frontend && npm test
	cd backend && mvn test -B

build:
	cd frontend && npm run build
	cd backend && mvn package -DskipTests -B

run:
	docker compose up --build

# Needed from M4 onwards
docker-build:
	docker build -t smarthome-frontend:latest ./frontend
	docker build -t smarthome-backend:latest ./backend

docker-up:
	docker compose up --build

