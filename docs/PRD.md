# JobSphere — Product Requirements Document (PRD)

## 1. Product Overview

### Product Name
JobSphere

### Product Type
Web-based Job Matching and Application Platform

### Technology
- Frontend: React.js, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- ODM: Mongoose
- Authentication: JWT
- Password Security: bcrypt
- API Testing: Postman
- Version Control: Git and GitHub

---

## 2. Problem Statement

Job seekers often find it difficult to discover suitable job opportunities and keep track of their applications.

Recruiters also face difficulties managing job postings and reviewing applicants efficiently.

JobSphere provides a simple platform where:

- Job seekers can create profiles.
- Job seekers can browse and search for jobs.
- Job seekers can apply for jobs.
- Job seekers can track their applications.
- Recruiters can create and manage job postings.
- Recruiters can view applicants.
- Recruiters can update application statuses.

---

## 3. Product Goal

The goal of JobSphere is to provide a simple centralized platform connecting job seekers and recruiters.

The MVP focuses on:

1. Authentication
2. User profiles
3. Job management
4. Job discovery
5. Job applications
6. Application tracking
7. Recruiter applicant management

---

## 4. Target Users

### 4.1 Job Seeker

A user looking for employment opportunities.

Main activities:

- Register
- Login
- Create/update profile
- Browse jobs
- Search jobs
- View job details
- Apply for jobs
- View submitted applications
- Track application status

### 4.2 Recruiter

A user who posts job opportunities.

Main activities:

- Register
- Login
- Create job postings
- Edit job postings
- Delete job postings
- View applicants
- Update application status

---

# 5. User Roles

## Job Seeker

Permissions:

- Manage own profile
- Browse jobs
- Search jobs
- View job details
- Apply to jobs
- View own applications

## Recruiter

Permissions:

- Manage own job postings
- Create jobs
- Update jobs
- Delete jobs
- View applicants for own jobs
- Update application status

Users must not access resources belonging to other users without authorization.

---

# 6. Functional Requirements

## 6.1 Authentication

The system shall allow users to:

- Register using name, email and password.
- Login using email and password.
- Receive a JWT after successful login.
- Access protected resources using the JWT.
- Logout from the application.

### Validation

- Required fields must be validated.
- Duplicate email registration must be prevented.
- Passwords must never be stored as plain text.
- Invalid credentials must be rejected.

---

## 6.2 User Profile

Users shall be able to:

- View their profile.
- Create/update profile information.
- Store relevant skills and experience.
- Maintain profile information for job applications.

---

## 6.3 Job Management

Recruiters shall be able to:

- Create jobs.
- View jobs.
- Update their jobs.
- Delete their jobs.

A job may contain:

- Job title
- Company
- Description
- Required skills
- Experience requirements
- Location
- Employment type
- Salary information where applicable

Only the recruiter who owns a job should be able to modify or delete it.

---

## 6.4 Job Discovery

Job seekers shall be able to:

- View available jobs.
- Search for jobs.
- Filter jobs where supported.
- View detailed information about a job.

---

## 6.5 Job Applications

Job seekers shall be able to:

- Apply for a job.
- View their submitted applications.
- View application status.

The system shall prevent a user from applying to the same job multiple times.

---

## 6.6 Recruiter Applicant Management

Recruiters shall be able to:

- View applicants for their jobs.
- View applicant information.
- View application details.
- Update application status.

Example statuses:

- Applied
- Reviewing
- Shortlisted
- Rejected
- Selected

---

# 7. Non-Functional Requirements

## Security

- Passwords must be hashed using bcrypt.
- JWT must be used for authenticated API requests.
- Protected routes must verify JWT tokens.
- Role-based authorization must be enforced.
- Sensitive credentials must not be committed to Git.

## Performance

The application should provide responsive API and UI interactions for normal MVP-scale usage.

## Usability

- UI should be simple and intuitive.
- Forms should provide useful validation messages.
- Navigation should be clear.
- Application should work on common desktop and mobile screen sizes.

## Maintainability

- Frontend and backend should remain separated.
- Backend routes, models and middleware should have clear responsibilities.
- Reusable React components should be used where appropriate.

---

# 8. Main User Flows

## Job Seeker Flow

Register
→ Login
→ Create/Update Profile
→ Browse Jobs
→ Search Job
→ View Job Details
→ Apply
→ View My Applications
→ Track Status

## Recruiter Flow

Register
→ Login
→ Create Job
→ Manage Jobs
→ View Applicants
→ Review Applications
→ Update Application Status

---

# 9. MVP Scope

### Included

- Authentication
- JWT authorization
- User roles
- User profiles
- Job CRUD
- Job search
- Job details
- Job applications
- Duplicate application prevention
- Application tracking
- Recruiter applicant management
- Application status updates
- Responsive frontend
- MongoDB Atlas integration

### Not Included in MVP

- Complex AI-based recruitment
- Real-time chat
- Video interviews
- Payment system
- Advanced recommendation engine
- Enterprise HR integrations
- Complex microservice architecture

---

# 10. Success Criteria

JobSphere will be considered successful when:

1. Users can register and login successfully.
2. Protected routes reject unauthorized users.
3. Job seekers can manage their profiles.
4. Recruiters can create and manage jobs.
5. Job seekers can discover jobs.
6. Job seekers can apply to jobs.
7. Duplicate applications are prevented.
8. Recruiters can view applicants.
9. Recruiters can update application statuses.
10. Frontend production build completes successfully.
11. MongoDB Atlas connection works reliably.
12. The complete job seeker and recruiter flows work end-to-end.

---

# 11. Future Improvements

Possible future features include:

- Skill-based job matching
- Skill-gap analysis
- Resume feedback
- Better job recommendations
- Notifications
- Email notifications
- Saved jobs
- Recruiter analytics
- Resume upload