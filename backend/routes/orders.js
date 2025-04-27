const express = require('express');
const router = express.Router();
const pool = require('../db');

// 获取所有订单
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT orders.*, properties.title, properties.price 
      FROM orders
      JOIN properties ON orders.property_id = properties.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// 创建新订单
router.post('/', async (req, res) => {
  const { user_id, property_id, check_in, check_out } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO orders 
       (user_id, property_id, check_in, check_out) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [user_id, property_id, check_in, check_out]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;