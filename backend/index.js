const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const orderRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

// 路由挂载
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));