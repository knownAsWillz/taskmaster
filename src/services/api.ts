import { Task, CreateTaskDto, UpdateTaskDto } from '@/types/task';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const taskApi = {
  // Get all tasks with optional filters
  getTasks: async (status?: string, sortBy?: string): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (sortBy) params.append('sort', sortBy);
    
    const url = `${API_URL}/tasks${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);
    return handleResponse<Task[]>(response);
  },

  // Get a single task by ID
  getTask: async (id: number): Promise<Task> => {
    const response = await fetch(`${API_URL}/tasks/${id}`);
    return handleResponse<Task>(response);
  },

  // Create a new task
  createTask: async (task: CreateTaskDto): Promise<Task> => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return handleResponse<Task>(response);
  },

  // Update an existing task
  updateTask: async (id: number, task: UpdateTaskDto): Promise<Task> => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return handleResponse<Task>(response);
  },

  // Delete a task
  deleteTask: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },
};
