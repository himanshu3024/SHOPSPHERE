const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const cart = req.session.cart || [];
  res.render('cart', { cart });
});

router.post('/add/:id', (req, res) => {
  const { id } = req.params;
  const item = { id: parseInt(id), name: 'Sample Product', price: 10 }; // Fake data
  req.session.cart = req.session.cart || [];
  req.session.cart.push(item);
  res.redirect('/cart');
});

module.exports = router;


const sql = require('../models');

router.post('/add/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql.query`SELECT * FROM Products WHERE ProductID = ${id}`;
    const product = result.recordset[0];

    if (product) {
      req.session.cart = req.session.cart || [];
      req.session.cart.push(product);
    }

    res.redirect('/cart');
  } catch (err) {
    console.error('Cart add error:', err);
    res.redirect('/products');
  }
});
