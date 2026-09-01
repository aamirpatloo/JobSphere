# 🌐 JobSphere - Simple Job Matching Platform

JobSphere is a simple, professional, and beginner-friendly job matching platform connecting **Job Seekers** and **Recruiters/Companies**.

---

## ✨ Features

### 👨‍💻 For Job Seekers
- **User Authentication:** Register & login with email and password (JWT protected).
- **Profile Management:** Create and update profile cards with phone number, skills, education, employment status, location, and work experience.
- **Job Browsing & Search:** Search jobs by title, skills, location, or experience level.
- **Job Details:** View detailed job responsibilities and requirements.
- **Application Submission:** One-click job applications with duplicate prevention.
- **Application Tracking:** Track the real-time status of submitted applications (`Applied`, `Reviewing`, `Shortlisted`, `Accepted`, `Rejected`, `Selected`).

### 🏢 For Recruiters / Companies
- **Recruiter Account:** Specialized role-based access for hiring managers.
- **Job Posting:** Publish new job listings with required skills, location, salary range, and description.
- **Recruiter Dashboard:** Manage active job listings and view applicant metrics.
- **Job Management:** Update or delete active job postings.
- **Applicant Review:** View complete applicant profile summaries.
- **Status Updates:** Update applicant hiring statuses with real-time sync.

---

## 🛠️ Technology Stack

- **Frontend:** React, Vite, React Router DOM, Tailwind CSS (v4)
- **Backend:** Node.js, Express.js
- **Database & ODM:** MongoDB Atlas, Mongoose
- **Authentication & Security:** JWT (JSON Web Tokens), bcrypt password hashing, CORS
- **API Testing:** Postman Collection

---

## 📁 Project Structure

```
JobSphere/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authorization middleware
│   ├── models/
│   │   ├── User.js               # User schema (jobseeker / recruiter)
│   │   ├── Profile.js            # Job seeker profile schema
│   │   ├── Job.js                # Job listing schema
│   │   └── Application.js        # Application schema
│   ├── routes/
│   │   ├── authRoutes.js         # Register, Login, Auth profile
│   │   ├── profileRoutes.js      # Get & Update profile
│   │   ├── jobRoutes.js          # Job CRUD & search filters
│   │   └── applicationRoutes.js  # Apply, list applications, update status
│   ├── .env.example              # Environment variables template
│   ├── app.js                    # Express app configuration & middleware
│   └── server.js                 # Server entry point (starts server after DB connection)
├── frontend/
│   ├── src/
│   │   ├── components/           # Navbar, Layout, Footer, InputField
│   │   ├── pages/                # Home, Jobs, JobDetails, Profile, Applications, RecruiterDashboard, CreateJob, EditJob, JobApplicants
│   │   ├── services/             # API service helpers (fetch abstraction)
│   │   ├── App.jsx               # Main React router configuration
│   │   └── index.css             # Tailwind CSS imports
│   └── vite.config.js
└── postman/
    └── JobSphere.postman_collection.json  # Postman API Collection
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the `backend/` directory based on `.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

> **Note:** Never commit `.env` or sensitive credentials to version control. `.env` is listed in `.gitignore`.

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas cluster URL (or local MongoDB)

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
The backend server will connect to MongoDB Atlas and start on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The Vite development server will start at `http://localhost:5173`.

---

## 🔌 API Overview

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | System & DB connection status |
| `POST` | `/api/auth/register` | Public | Register jobseeker or recruiter |
| `POST` | `/api/auth/login` | Public | Authenticate user & get JWT token |
| `GET` | `/api/auth/profile` | Protected | Get authenticated user info |
| `GET` | `/api/profile` | Protected | Fetch current user's profile card |
| `POST` | `/api/profile` | Protected | Create or update user profile card |
| `GET` | `/api/jobs` | Public | List jobs (supports `title`, `skills`, `location`, `experience` filters) |
| `GET` | `/api/jobs/my` | Recruiter | Get jobs created by logged-in recruiter |
| `GET` | `/api/jobs/:id` | Public | Fetch job details by ID |
| `POST` | `/api/jobs` | Recruiter | Post a new job listing |
| `PUT` | `/api/jobs/:id` | Recruiter | Update a job (owner only) |
| `DELETE` | `/api/jobs/:id` | Recruiter | Delete a job (owner only) |
| `POST` | `/api/applications/:jobId` | Job Seeker | Apply for a job |
| `GET` | `/api/applications/my` | Job Seeker | View my submitted applications |
| `GET` | `/api/applications/job/:jobId` | Recruiter | View applicants for a job |
| `PUT` | `/api/applications/:id/status` | Recruiter | Update application status |

---

## 🧪 Testing

### Frontend Build Verification
```bash
cd frontend
npm run build
```

### Postman API Testing
Import `postman/JobSphere.postman_collection.json` into Postman to test all endpoints.

---

## 📜 License
This project is open source and available under the ISC License.
