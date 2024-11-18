const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const preData = require('./data/predata');
const loginRouter = require('./routers/login.router');
const vehicleRouter = require('./routers/vehicle.router');
const app = express();
const port = 3000;

app.use(cors(
    {
        origin: ["https://deploy-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
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
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
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

app.get("/", (req, res) => {
    res.json("Hello");
})
app.use('/login', loginRouter);
app.use('/vehicles', vehicleRouter);
