import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Your Laravel backend URL
  withCredentials: true,
});

export default {
  async register(user) {
    return api.post('/register', user);
  },
  
  async login(credentials) {
    return api.post('/login', credentials);
  },

  async logout() {
    return api.post('/logout');
  },

  async getUser(token) {
    return api.get('/user', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
};
