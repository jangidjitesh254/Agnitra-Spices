import express from 'express';
import { dbService } from '../db.js';

const router = express.Router();

// GET all products
router.get('/products', async (req, res) => {
  try {
    const products = await dbService.getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// GET single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await dbService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(`Error fetching product ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to retrieve product details' });
  }
});

// POST create order
router.post('/orders', async (req, res) => {
  try {
    const { customer, items, totalAmount } = req.body;
    
    // Validation
    if (!customer || !customer.name || !customer.email || !customer.phone || !customer.address) {
      return res.status(400).json({ error: 'Customer billing details are incomplete.' });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty. Order must contain at least 1 item.' });
    }
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ error: 'Invalid total order amount.' });
    }

    const order = await dbService.createOrder({ customer, items, totalAmount });
    res.status(201).json({
      success: true,
      message: 'Order placed successfully! Keep your aroma lock seal tight.',
      order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to place the order' });
  }
});

// GET all orders (primarily for tracking page / admin view)
router.get('/orders', async (req, res) => {
  try {
    const orders = await dbService.getOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

// POST submit contact form message
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message content are required.' });
    }

    const savedMessage = await dbService.createMessage({ name, email, phone, subject, message });
    res.status(201).json({
      success: true,
      message: 'Inquiry received. A spice specialist will connect with you shortly.',
      savedMessage
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Failed to submit contact message' });
  }
});

export default router;
