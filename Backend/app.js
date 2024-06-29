const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const preData = require('./data/predata')
const loginRouter = require('./routers/login.router'); 
const vehicleRouter = require('./routers/vehicle.router'); 

const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/CarList", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
  });

app.use(cors());
app.use(express.json()); 
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));
preData
app.use('/login', loginRouter); 
app.use('/vehicles', vehicleRouter); 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
