const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const preData = require('./data/predata');
const loginRouter = require('./routers/login.router'); 
const vehicleRouter = require('./routers/vehicle.router'); 

const app = express();
const port = 3000;


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));


mongoose.connect('mongodb://127.0.0.1:27017/CarList')
  .then(async () => {
    console.log('Database Connected');
    
    await preData(); 

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
  });


app.use('/login', loginRouter); 
app.use('/vehicles', vehicleRouter);
