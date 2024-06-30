const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const preData = require('./data/predata');
const loginRouter = require('./routers/login.router');
const vehicleRouter = require('./routers/vehicle.router');
const dbURL = 'mongodb://127.0.0.1:27017/CarList'
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
  cookie: {
    secure: false, 
    httpOnly: true,
    sameSite: 'lax', 
  }
}));

preData();

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Database Connected');

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((err) => {
  console.error('Error connecting to database:', err);
  process.exit(1);
});

app.use('/login', loginRouter);
app.use('/vehicles', vehicleRouter);
