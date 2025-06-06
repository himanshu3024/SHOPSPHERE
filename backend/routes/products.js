const express = require('express');
const router = express.Router();
const sql = require('../models');

router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Products`;
    const products = result.recordset;
    res.render('products', { products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.send('Failed to load products');
  }
});

module.exports = router;
