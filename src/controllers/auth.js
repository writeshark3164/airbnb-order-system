const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
  login: async (req, res) => {
    try {
      const { email, password, rememberMe } = req.body;
      const user = await User.findByEmail(email);
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const isMatch = await User.comparePasswords(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: rememberMe ? '7d' : '1h' }
      );
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000
      });
      
      res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  logout: (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
  },

  getUser: (req, res) => {
    res.json({ user: req.user });
  }
};

module.exports = authController;