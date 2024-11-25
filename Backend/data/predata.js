const mongoose = require('mongoose');
const User = require('../models/login.model');
const dbURL = 'mongodb+srv://imtinan:imtinan1234@cluster0.pmdmttr.mongodb.net/CarList?appName=Cluster0&retryWrites=true&w=majority'
const preData = async () => {
  let connection;
  try {
    connection = await mongoose.createConnection(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected');

    const users = [
      {
        email: 'Amjad@desolint.com',
        password: '123456abc',
      },
      {
        email: 'imtinan@gmail.com',
        password: 'imtinan123',
      },
      {
        email: 'ali@gmail.com',
        password: 'ali12345678',
      },
      {
        email: "imtinan@gmail1111111111.com",
        password: "imtinan123",
      },
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const newUser = new User(userData);
        await newUser.save();
        console.log(`User ${userData.email} added successfully to MongoDB`);
      } else {
        console.log(`User ${userData.email} already exists in MongoDB`);
      }
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    if (connection) {
      await connection.close();
      console.log('Disconnected from MongoDB');
    }
  }
};

module.exports = preData;
