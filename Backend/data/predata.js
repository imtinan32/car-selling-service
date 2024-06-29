const mongoose = require('mongoose');
const User = require('../models/login.model'); 

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/CarList', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const userData = {
      email: 'Amjad@desolint.com',
      password: '123456abc',
    };


    const existingUser = await User.findOne({ email: userData.email });

    
    if (!existingUser) {
      const newUser = new User(userData);
      await newUser.save();
      console.log('User added successfully to MongoDB');
    } else {
      console.log('User already exists in MongoDB');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    
    mongoose.disconnect();
  }
}


seedDatabase();
