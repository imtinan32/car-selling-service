const mongoose = require('mongoose');
const User = require('../models/login.model');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email);

  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB not connected');
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      console.log("Invalid email or password");
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    console.log("Login successful for user:", user.email);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
