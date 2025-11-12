# Task Management System - Integration Guide

## Overview
This React frontend is designed to integrate with a Laravel backend API. It implements a complete task management system with CRUD operations.

## Quick Start

### 1. Environment Setup

Create a `.env` file in the frontend root:

```bash
VITE_API_URL=http://localhost:8000/api
```

Replace `http://localhost:8000` with your Laravel backend URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The app will run on `http://localhost:8080`

## API Integration

### Expected Laravel Backend Endpoints

The frontend expects the following REST API endpoints:

#### GET /api/tasks
- **Purpose**: Retrieve all tasks
- **Query Parameters**: 
  - `status` (optional): Filter by status (pending, in-progress, completed)
  - `sort` (optional): Sort by field (created_at, due_date, title)
- **Response**: Array of task objects

```json
[
  {
    "id": 1,
    "title": "Task Title",
    "description": "Task description",
    "status": "pending",
    "due_date": "2025-11-20",
    "created_at": "2025-11-10T10:00:00Z",
    "updated_at": "2025-11-10T10:00:00Z"
  }
]
```

#### POST /api/tasks
- **Purpose**: Create a new task
- **Request Body**:
```json
{
  "title": "string (required, max 255)",
  "description": "string (optional)",
  "status": "pending|in-progress|completed (required)",
  "due_date": "YYYY-MM-DD (optional)"
}
```
- **Response**: Created task object (201 status)

#### GET /api/tasks/{id}
- **Purpose**: Retrieve a single task
- **Response**: Task object (200 status) or 404

#### PUT /api/tasks/{id}
- **Purpose**: Update an existing task
- **Request Body**: Same as POST (all fields optional)
- **Response**: Updated task object (200 status)

#### DELETE /api/tasks/{id}
- **Purpose**: Delete a task
- **Response**: 204 No Content

### CORS Configuration

Your Laravel backend needs to allow requests from `http://localhost:8080` (or your frontend URL).

In Laravel, install and configure the CORS package:

```bash
composer require fruitcake/laravel-cors
```

Update `config/cors.php`:

```php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:8080'],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

## Features Implemented

### ✅ Task List View
- Display all tasks in card layout
- Real-time status badges
- Due date tracking with overdue warnings
- Hover actions for edit/delete

### ✅ Task Creation
- Form validation with Zod
- Required fields: title, status
- Optional fields: description, due_date
- Success/error toast notifications

### ✅ Task Editing
- Pre-populated form with existing data
- Same validation as creation
- Update confirmation

### ✅ Task Deletion
- Confirmation dialog before deletion
- Safe error handling

### ✅ Status Management
- Quick status change buttons on cards
- Visual status indicators with icons
- Color-coded badges

### ✅ Filtering & Sorting
- Filter by status (all, pending, in-progress, completed)
- Sort by created date, due date, or title
- Client-side filtering for smooth UX

### ✅ Statistics Dashboard
- Total tasks count
- Pending, in-progress, completed counts
- Visual breakdown

### ✅ Responsive Design
- Mobile-friendly card grid
- Responsive header and filters
- Touch-friendly actions

## Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── TaskCard.tsx     # Individual task display
│   ├── TaskForm.tsx     # Create/edit form
│   └── TaskFilters.tsx  # Status filter & sort controls
├── services/
│   └── api.ts           # API service layer
├── types/
│   └── task.ts          # TypeScript interfaces
└── pages/
    └── Index.tsx        # Main application page
```

## Development Notes

### Mock Data
The app includes mock data that loads if the backend API is not available. This allows frontend development without a running backend.

### Error Handling
All API calls are wrapped with try-catch blocks and display user-friendly error messages via toast notifications.

### Type Safety
Full TypeScript types ensure type safety across the application. The `Task` interface matches the expected Laravel model structure.

## Testing Backend Connection

1. Ensure your Laravel backend is running
2. Set `VITE_API_URL` in `.env`
3. Check browser console for API call logs
4. Verify CORS headers in Network tab

## Common Issues

### CORS Errors
**Problem**: Browser blocks API requests
**Solution**: Configure CORS in Laravel (see above)

### 404 on API Routes
**Problem**: Laravel routes not found
**Solution**: Ensure `Route::apiResource('tasks', TaskController::class);` is in `routes/api.php`

### Validation Errors
**Problem**: 422 responses from Laravel
**Solution**: Check that Laravel validation rules match frontend types

## Production Build

```bash
npm run build
```

Built files will be in `dist/` directory. Deploy to any static hosting service.

## Next Steps for Backend Developer

1. Create Laravel project with API-only routes
2. Set up tasks table migration (see backend requirements)
3. Create Task model and TaskController
4. Implement validation rules
5. Configure CORS
6. Run seeder for test data
7. Test all endpoints with Postman/Insomnia
8. Connect frontend via .env configuration

## Support

For questions about the React frontend, refer to the component documentation in the code comments.
For Laravel backend setup, refer to the Laravel documentation: https://laravel.com/docs
