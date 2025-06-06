// backend/app.js

// Load environment variables from .env
require('dotenv').config();

// Import Express
const express = require('express');
const app = express();

// Basic home route
app.get('/', (req, res) => {
  res.send('Welcome to ShopSphere! Server is running.');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ShopSphere back end listening on http://localhost:${PORT}`);
});
