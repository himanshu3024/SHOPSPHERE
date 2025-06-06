// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const sql = require('../models');
const router = express.Router();

// Register Page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register Handler
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    await sql.query`INSERT INTO Users (Username, PasswordHash) VALUES (${username}, ${hashed})`;
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.send('Error registering user.');
  }
});

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Login Handler
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await sql.query`SELECT * FROM Users WHERE Username = ${username}`;
    const user = result.recordset[0];
    if (user && await bcrypt.compare(password, user.PasswordHash)) {
      req.session.user = user;
      res.redirect('/');
    } else {
      res.send('Invalid credentials.');
    }
  } catch (err) {
    console.error(err);
    res.send('Login error.');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
