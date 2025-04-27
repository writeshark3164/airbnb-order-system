<template>
  <div id="app">
    <h1>Vue + Node.js + Render Demo</h1>
    
    <div class="add-user">
      <h2>添加用户</h2>
      <input v-model="newItem.user" placeholder="用户名">
      <input v-model="newItem.password" placeholder="密码">
      <button @click="addItem">添加</button>
    </div>
    
    <div class="user-list">
      <h2>用户列表</h2>
      <div v-if="loading">加载中...</div>
      <div v-else>
        <div v-for="item in items" :key="item.id" class="user">
          <h3>{{ item.user }}</h3>
          <p>{{ item.password }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://airbnb-order-system-backend.onrender.com' // 替换为您的后端服务 URL
});

export default {
  name: 'App',
  data() {
    return {
      items: [],
      loading: true,
      newItem: {
        email: '',
        password: ''
      }
    };
  },
  async created() {
    await this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const response = await api.get('/api/users');
        this.items = response.data;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching users:', error);
        this.loading = false;
      }
    },
    async addItem() {
      if (!this.newItem.email) return;
      
      try {
        await api.post('/api/users', this.newItem);
        this.newItem = { email: '', password: '' };
        await this.fetchItems();
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.add-item {
  margin-bottom: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 5px;
}

.add-item input {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  max-width: 400px;
}

button {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #369f6e;
}

.items-list {
  margin-top: 20px;
}

.item {
  padding: 15px;
  margin-bottom: 10px;
  background: #f9f9f9;
  border-radius: 5px;
}
</style>