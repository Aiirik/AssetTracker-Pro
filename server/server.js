const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
// Use PORT from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Asset Management System API Running...');
});

// Asset routes
app.use('/api/assets', require('./routes/assetRoutes'));
// User routes
app.use('/api/users', require('./routes/userRoutes'));
// Report routes
app.use('/api/reports', require('./routes/reportRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});