const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const loginRouter = require('./routers/login.router');
const vehicleRouter = require('./routers/vehicle.router');
const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/CarList").then(() => {
  console.log('Database Connected');
}).catch((err) => {
  console.error('Error connecting to database', err);
});

app.use(express.json()); 

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use('/login', loginRouter);
app.use('/vehicles', vehicleRouter);

app.listen(port, () => {
  console.log(`Port listen at ${port}`);
});
