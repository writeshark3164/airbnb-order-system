const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

// 中间件
app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// 路由
app.use('/api/auth', authRoutes);

// 测试路由
app.get('/', (req, res) => {
  res.send('Airbnb Clone API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});