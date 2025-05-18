const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // MongoDB connection setup
const createUserRouter = require('./Routes/CreateUser');

const app = express();
const port = process.env.PORT || 5000;

// List allowed origins (add your actual frontend URL here)
const allowedOrigins = [
  'http://localhost:3000',               // Local development frontend
  'https://hungry-hound-9x72-esuhoa0ua-adityapratapsingh10s-projects.vercel.app/',
  'https://fluffy-jalebi-969ad2.netlify.app/'   // Replace with your actual Vercel frontend URL
];

// Middleware for CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: This origin is not allowed.'));
    }
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept',
  credentials: true,
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', createUserRouter);
app.use('/api/users', require("./Routes/DisplayData"));
app.use('/api/users', require("./Routes/OrderData"));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start server
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
