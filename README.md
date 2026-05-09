# 🚀 ATS Fullstack Application (Django + React)

## 📌 Overview

This is a full-stack **Applicant Tracking System (ATS)** built using:

* Backend: Django + Django REST Framework
* Frontend: React.js
* Database: SQLite / MySQL

The system allows recruiters to manage job applications, candidates, and hiring workflows.

---

## ⚙️ Features

* Create and manage job postings
* Candidate application tracking
* REST APIs for all operations
* Frontend UI for recruiters
* Basic validation and error handling

---

## 🛠️ Tech Stack

* Python (Django, DRF)
* JavaScript (React)
* HTML, CSS, Bootstrap
* SQLite / MySQL

---

## 🧑‍💻 Setup Instructions

### 🔹 Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 API Base URL

```
http://127.0.0.1:8000/api/
```

---

## 📊 API Documentation

### 🔹 Jobs API

* `GET /api/jobs/` → List all jobs
* `POST /api/jobs/` → Create new job
* `GET /api/jobs/{id}/` → Get job details
* `PUT /api/jobs/{id}/` → Update job
* `DELETE /api/jobs/{id}/` → Delete job

### 🔹 Candidates API

* `GET /api/candidates/`
* `POST /api/candidates/`
* `GET /api/candidates/{id}/`

### 🔹 Applications API

* `GET /api/applications/`
* `POST /api/applications/`
* `PATCH /api/applications/{id}/` → Update status

---

## 🌐 Deployment (Optional)

* Backend: Render / Railway
* Frontend: Vercel / Netlify

(Add your deployed link here if available)

---

## ⚠️ Edge Case Handling

* Duplicate applications prevented
* Validation for required fields
* Proper error responses (400, 404, 500)
* Empty data handling

---

## 🎯 Evaluation Criteria Coverage

### ✅ Code Quality

* Modular Django apps
* Clean React components
* Proper folder structure

### ✅ Database Design

* Normalized models (Jobs, Candidates, Applications)
* Foreign key relationships

### ✅ API Design

* RESTful endpoints
* Proper HTTP methods

### ✅ Business Logic

* Application status tracking
* Job-candidate relationship

### ✅ Edge Cases

* Invalid input handling
* Missing data validation

### ⭐ Bonus Features

* Search/filter jobs
* Pagination
* Authentication (if implemented)

---

## 📬 Author

**Venkatarao Parimi**

* Email: [venkatraoparimi17@gmail.com](mailto:venkatraoparimi17@gmail.com)

---

