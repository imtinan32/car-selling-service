const mongoose = require('mongoose');
const User = require('./models/User');

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/CarList', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const newUser = new User({
      email: 'Amjad@desolint.com',
      password: '123456abc',
    });

    await newUser.save();
    console.log('User added successfully to MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
