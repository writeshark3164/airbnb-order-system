<template>
    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">Welcome to Airbnb Clone</h1>
        <form @submit.prevent="handleSubmit" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <div class="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              v-model="rememberMe"
            />
            <label for="rememberMe">Remember me</label>
          </div>
          <button type="submit" class="login-button">Log In</button>
        </form>
        <div v-if="message" class="message" :class="{ error: !success }">
          {{ message }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  
  const email = ref('')
  const password = ref('')
  const rememberMe = ref(false)
  const message = ref('')
  const success = ref(false)
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  const handleSubmit = async () => {
    const result = await authStore.login(email.value, password.value, rememberMe.value)
    
    if (result.success) {
      success.value = true
      message.value = 'Login successful! Redirecting...'
      setTimeout(() => {
        router.push({ name: 'welcome' })
      }, 1000)
    } else {
      success.value = false
      message.value = result.message || 'Login failed'
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f7f7f7;
    padding: 20px;
  }
  
  .login-card {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  
  .login-title {
    font-size: 24px;
    margin-bottom: 24px;
    color: #333;
    text-align: center;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .form-group label {
    font-size: 14px;
    color: #555;
  }
  
  .form-group input {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s;
  }
  
  .form-group input:focus {
    border-color: #ff5a5f;
    outline: none;
  }
  
  .remember-me {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 0;
  }
  
  .remember-me input {
    width: auto;
  }
  
  .login-button {
    background-color: #ff5a5f;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .login-button:hover {
    background-color: #e04a50;
  }
  
  .message {
    margin-top: 16px;
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  .message.error {
    background-color: #ffebee;
    color: #c62828;
  }
  </style>