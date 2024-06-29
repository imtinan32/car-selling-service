const User = require('../models/login.model');  

exports.login = async (req, res) => {
  const { email, password } = req.body;
 console.log("err:",email)
  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    req.session.userId = user._id;

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
