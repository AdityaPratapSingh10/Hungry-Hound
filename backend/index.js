const express  = require('express');
const cors     = require('cors');
const connectDB = require('./db');
const createUserRouter = require('./Routes/CreateUser');

const app  = express();
const port = process.env.PORT || 5000;

/* ★ Add every frontend origin EXACTLY as the browser sends it */
const allowedOrigins = [
  'http://localhost:3000',
  'https://hungry-hound-9x72-esuhoa0ua-adityapratapsingh10s-projects.vercel.app',
  'https://fluffy-jalebi-969ad2.netlify.app'
];

/* ----------  CORS  ---------- */
app.use(
  cors({
    origin(origin, callback) {
      // allow Postman / server‑to‑server requests that have no Origin header
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.error(`Blocked by CORS: ${origin}`);
      return callback(new Error('CORS policy: This origin is not allowed.'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true
  })
);

/* ----------  DB & routes  ---------- */
connectDB();
app.use(express.json());

app.use('/api/users', createUserRouter);
app.use('/api/users', require('./Routes/DisplayData'));
app.use('/api/users', require('./Routes/OrderData'));

app.get('/', (_, res) => res.send('Hello World'));

/* ----------  Start server  ---------- */
app.listen(port, () => console.log(`Server running on port ${port}`));
