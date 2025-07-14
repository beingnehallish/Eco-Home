// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET /api/orders/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('products.productId'); // required for full product info
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


module.exports = router;
// routes/userRoutes.js
router.put('/update/:id', async (req, res) => {
  try {
    const { phone, addresses } = req.body;
    const updated = await User.findByIdAndUpdate(req.params.id, { phone, addresses }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});
