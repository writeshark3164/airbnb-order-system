<template>
  <div class="welcome-container">
    <header class="header">
      <div class="logo">Airbnb Clone</div>
      <nav class="nav">
        <button @click="handleLogout" class="logout-button">Log Out</button>
      </nav>
    </header>
    
    <main class="main-content">
      <h1>Welcome, {{ user.name }}!</h1>
      <p class="subtitle">You're now logged in to your Airbnb Clone account.</p>
      
      <div class="property-grid">
        <div v-for="i in 6" :key="i" class="property-card">
          <div class="property-image"></div>
          <div class="property-details">
            <h3>Beautiful Property {{ i }}</h3>
            <p>${{ 100 + i * 20 }} per night</p>
            <div class="rating">★ 4.8</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const user = computed(() => authStore.user)

const handleLogout = async () => {
  const result = await authStore.logout()
  if (result.success) {
    router.push({ name: 'login' })
  }
}
</script>

<style scoped>
.welcome-container {
  min-height: 100vh;
  background-color: #f7f7f7;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #ff5a5f;
}

.nav {
  display: flex;
  gap: 20px;
}

.logout-button {
  padding: 8px 16px;
  background-color: #ff5a5f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #e04a50;
}

.main-content {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.main-content h1 {
  font-size: 32px;
  margin-bottom: 16px;
  color: #333;
}

.subtitle {
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.property-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.property-card:hover {
  transform: translateY(-4px);
}

.property-image {
  height: 200px;
  background-color: #eee;
  background-image: linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd),
                    linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}

.property-details {
  padding: 16px;
}

.property-details h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.property-details p {
  margin: 0 0 8px 0;
  color: #666;
}

.rating {
  color: #ff5a5f;
  font-weight: bold;
}
</style>