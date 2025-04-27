<template>
  <div class="home-container">
    <header class="header">
      <div class="logo">Airbnb Clone</div>
      <nav class="nav">
        <router-link to="/login" class="login-link">Log In</router-link>
      </nav>
    </header>
    
    <main class="main-content">
      <h1>Find your perfect stay</h1>
      <p class="subtitle">Discover amazing properties around the world</p>
      
      <router-link to="/login" class="cta-button">Get Started</router-link>
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-container {
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

.login-link {
  padding: 8px 16px;
  background-color: white;
  color: #ff5a5f;
  border: 1px solid #ff5a5f;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s;
}

.login-link:hover {
  background-color: #ff5a5f;
  color: white;
}

.main-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  text-align: center;
  padding: 0 20px;
}

.main-content h1 {
  font-size: 48px;
  margin-bottom: 16px;
  color: #333;
}

.subtitle {
  font-size: 20px;
  color: #666;
  margin-bottom: 32px;
}

.cta-button {
  padding: 12px 24px;
  background-color: #ff5a5f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #e04a50;
}
</style>