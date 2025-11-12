# 🗂️ Task Management System (React + Laravel)

**Course:** CCS112 – Application Development and Emerging Technology  
**University:** University of Cabuyao (Pamantasan ng Cabuyao)  
**Instructor:** Mr. Joseph D. Cartagenas  

---

## 📘 Project Overview

The **Task Management System** is a full-stack CRUD application built with **Laravel** (for the backend API) and **React** (for the frontend interface).  
It allows users to **create**, **view**, **update**, **delete**, and **mark tasks as completed**.

This project demonstrates RESTful API development, frontend-backend integration, and proper Git workflow across multiple milestones.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (using fetch/axios, Bootstrap or CSS) |
| Backend | Laravel (API only) |
| Database | MySQL or SQLite |
| API Format | JSON |
| Version Control | Git (5 milestone branches) |

---

## 🧩 Features

### Core Features
- View all tasks
- Add a new task
- Edit existing tasks
- Delete tasks
- Mark tasks as completed

### Backend (Laravel)
- RESTful API endpoints:
  | Method | Endpoint | Description |
  |--------|-----------|-------------|
  | `GET` | `/api/tasks` | Fetch all tasks |
  | `POST` | `/api/tasks` | Create a new task |
  | `GET` | `/api/tasks/{id}` | View a specific task |
  | `PUT` | `/api/tasks/{id}` | Update a task |
  | `DELETE` | `/api/tasks/{id}` | Delete a task |

- Migration: `tasks` table with columns `id`, `title`, `description`, `status`, `due_date`, timestamps  
- Seeder: Generates 20+ sample tasks  
- Model: `Task` (`fillable`: `title`, `description`, `status`, `due_date`)

### Frontend (React)
- `TaskList` – Displays all tasks  
- `TaskForm` – Add new task  
- `TaskEdit` – Edit existing task  
- Optional: `TaskView` for detailed view  

Includes:
- Loading & error handling  
- Confirmation before delete  
- Automatic refresh after CRUD operations  

## 🚀 Setup & Installation

### Frontend Setup (React)
cd frontend
npm install
npm start
React app runs by default at http://localhost:3000

If using a custom API port, create .env in /frontend:

REACT_APP_API_URL=http://localhost:8000/api

###  Backend Setup (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configure your DB credentials in .env
php artisan migrate --seed
php artisan serve

cd frontend
npm install
npm start
