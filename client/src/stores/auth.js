import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    returnUrl: null
  }),
  actions: {
    async login(email, password, rememberMe) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password,
          rememberMe
        }, { withCredentials: true });
        
        this.user = response.data.user;
        localStorage.setItem('user', JSON.stringify(this.user));
        
        return { success: true };
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Login failed' };
      }
    },
    async logout() {
      try {
        await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
        this.user = null;
        localStorage.removeItem('user');
        return { success: true };
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Logout failed' };
      }
    },
    async checkAuth() {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/user', { withCredentials: true });
        this.user = response.data.user;
        localStorage.setItem('user', JSON.stringify(this.user));
        return { isAuthenticated: true };
      } catch (error) {
        this.user = null;
        localStorage.removeItem('user');
        return { isAuthenticated: false };
      }
    }
  }
})