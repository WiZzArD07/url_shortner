#  URL Shortener (Production-Ready Backend System)

A scalable, Dockerized URL shortener built using Node.js, MySQL, and Redis.
Designed with production-grade patterns including caching, retry mechanisms, and automated database initialization.

---

##  Repository Description

Production-ready URL shortener built with Node.js, MySQL, and Redis. Features include Dockerized architecture, auto DB initialization, caching layer, and resilient service startup with retry logic.

---

##  Topics

`url-shortener` `nodejs` `express` `mysql` `redis` `docker` `docker-compose` `backend` `rest-api` `system-design` `caching` `scalable` `microservices`

---

##  Features

* 🔗 Shorten long URLs into compact codes
* 🔁 Redirect using short URLs
* ⚡ Redis caching for ultra-fast lookups
* 📊 Click tracking (analytics)
* 🐳 Fully Dockerized (multi-container setup)
* 🧠 Auto-retry DB connection (resilient startup)
* 🗄️ Automatic DB initialization (`init.sql`)
* 🔥 Clean layered architecture (Controller → Service → Config)

---

##  Tech Stack

| Layer     | Technology             |
| --------- | ---------------------- |
| Backend   | Node.js, Express       |
| Database  | MySQL                  |
| Cache     | Redis                  |
| Container | Docker, Docker Compose |

---

##  Project Structure

```
URL_SHORTNER/
│
├── config/
│   ├── db.js
│   └── redis.js
│
├── controllers/
│   └── urlController.js
│
├── routes/
│   └── urlRoutes.js
│
├── services/
│   └── urlService.js
│
├── utils/
│   └── base62.js
│
├── init.sql
├── docker-compose.yml
├── Dockerfile
├── app.js
├── .env
```

---

##  System Architecture

```
Client → Express API → Service Layer → MySQL
                        ↓
                      Redis (Cache)
```

---

##  API Flow Diagrams

### 🔹 Shorten API Flow

```
Client → POST /shorten
        ↓
Controller
        ↓
Service Layer
        ↓
MySQL (INSERT)
        ↓
Return short code
```

---

### 🔹 Redirect Flow (Core Logic)

```
Client → GET /:code
        ↓
Controller
        ↓
Service Layer
        ↓
Check Redis
   │
   ├── HIT → Return URL → Redirect
   │
   └── MISS → Query MySQL
                    ↓
              Store in Redis
                    ↓
               Return URL → Redirect
```

---

##  Caching Behavior

| Scenario      | Behavior              |
| ------------- | --------------------- |
| First request | Cache MISS → DB query |
| Next requests | Cache HIT → Redis     |

---

##  API Endpoints

### 🔹 Create Short URL

```
POST /shorten
```

Body:

```json
{
  "longUrl": "https://google.com"
}
```

---

### 🔹 Redirect

```
GET /:code
```

---

### 🔹 Stats

```
GET /stats/:code
```

---

##  Running the Project

### 1. Clone

```
git clone <your-repo-link>
cd url_shortner
```

### 2. Run with Docker

```
docker-compose down -v
docker-compose up --build
```

---

##  Environment Variables

```
DB_HOST=db
DB_USER=root
DB_PASSWORD=root
DB_NAME=url_shortener

REDIS_URL=redis://redis:6379
```

---

##  Key Engineering Decisions

### 1. Resilient DB Connection

* Retry mechanism ensures app waits for DB readiness

### 2. Cache-First Architecture

* Redis reduces DB load drastically

### 3. Dockerized Microservices

* Separate containers for app, DB, and Redis

### 4. Automatic DB Initialization

* `init.sql` removes manual setup

---

##  Example Logs

```
Cache MISS: abc123
Storing in Redis: abc123

Cache HIT: abc123
```

---

##  Resume Value

* Built a **production-ready backend system**
* Implemented **Redis caching for performance optimization**
* Designed **containerized architecture using Docker**
* Developed **fault-tolerant DB connection strategy**
* Automated database setup using **init scripts**

---

##  Future Improvements

* Custom short URLs
* Expiry-based links
* Rate limiting
* Authentication system
* Analytics dashboard

---

## 🔐 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

##  Author

Aryan (Developer)

---
