import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Update with your backend API URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  // Register a new user
  register(userData) {
    return api.post('/register', userData); // Make sure your backend supports this route
  },
  
  // Login a user
  login(credentials) {
    return api.post('/login', credentials); // Ensure your backend supports this route
  },

  // Get all todos (requires authentication)
  getAllTodos() {
    const token = localStorage.getItem('auth_token');
    return api.get('/todos', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  // Create a new todo (requires authentication)
  createTodo(todoData) {
    const token = localStorage.getItem('auth_token');
    return api.post('/todos', todoData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  // Delete a todo (requires authentication)
  deleteTodo(todoId) {
    const token = localStorage.getItem('auth_token');
    return api.delete(`/todos/${todoId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  // Edit a todo (requires authentication)
  editTodo(todoId, todoData) {
    const token = localStorage.getItem('auth_token');
    return api.put(`/todos/${todoId}`, todoData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  // Logout a user
  logout() {
    const token = localStorage.getItem('auth_token');
    return api.post('/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      // Clear the token on successful logout
      localStorage.removeItem('auth_token');
      return response;
    });
  }
};
