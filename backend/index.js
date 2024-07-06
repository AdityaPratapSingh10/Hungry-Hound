const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // MongoDB connection setup
const createUserRouter = require('./Routes/CreateUser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware for CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept'
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', createUserRouter);
app.use('/api/users',require("./Routes/DisplayData"));
app.use('/api/users',require("./Routes/OrderData"))
// Basic route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start server
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
