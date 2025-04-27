const express = require('express');
const router = express.Router();
const pool = require('../db');

// 获取所有房源
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// 添加新房源（示例）
router.post('/', async (req, res) => {
  const { title, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO properties (title, price) VALUES ($1, $2) RETURNING *',
      [title, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;