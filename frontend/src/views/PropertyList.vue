<template>
    <div>
      <h2>房源列表</h2>
      <div v-for="property in properties" :key="property.id">
        {{ property.title }} - ${{ property.price }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        properties: []
      };
    },
    async created() {
      const response = await axios.get('/api/properties');
      this.properties = response.data;
    }
  };
  </script>