# JobSphere — High-Level Design (HLD)

## 1. System Overview

JobSphere follows a simple three-layer web application architecture:

Frontend
→ Backend API
→ MongoDB Database

The frontend communicates with the backend using HTTP/REST APIs.

The backend handles:

- Authentication
- Authorization
- Business logic
- Validation
- Database operations

MongoDB stores users, profiles, jobs and applications.

---

# 2. High-Level Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    │ Browser / Client    │
                    └──────────┬──────────┘
                               │
                               │ HTTP / REST
                               ▼
                    ┌─────────────────────┐
                    │ React Frontend      │
                    │ Vite + Tailwind     │
                    └──────────┬──────────┘
                               │
                               │ API Requests
                               ▼
                    ┌─────────────────────┐
                    │ Express Backend     │
                    │ Node.js             │
                    └──────────┬──────────┘
                               │
               ┌───────────────┼───────────────┐
               │               │               │
               ▼               ▼               ▼
        Authentication      Routes         Middleware
        JWT + bcrypt        Business       Authorization
                            Logic
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Mongoose            │
                    │ ODM                 │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ MongoDB Atlas        │
                    │ Database             │
                    └─────────────────────┘