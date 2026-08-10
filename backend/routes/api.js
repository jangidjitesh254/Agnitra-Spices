import express from 'express';
import { dbService } from '../db.js';

const router = express.Router();

// In-memory OTP storage map (phone -> { otp, expiresAt })
const otpStore = new Map();

// Helper to dispatch Real SMS OTP via Fast2SMS or Twilio API
async function sendRealSmsOtp(phone, otp) {
  const cleanPhone = phone.replace(/\D/g, '').slice(-10);

  // 1. Try Fast2SMS (India SMS Gateway)
  if (process.env.FAST2SMS_API_KEY) {
    try {
      const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          'authorization': process.env.FAST2SMS_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          route: 'otp',
          variables_values: otp,
          numbers: cleanPhone
        })
      });
      const data = await response.json();
      console.log(`📡 [FAST2SMS DISPATCH] +91 ${cleanPhone} -> status:`, data.return ? 'SUCCESS' : data.message || 'FAILED');
      return { provider: 'Fast2SMS', success: data.return === true, details: data };
    } catch (error) {
      console.error('❌ Fast2SMS Dispatch Error:', error);
    }
  }

  // 2. Try Twilio (Global SMS Gateway)
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    try {
      const authHeader = 'Basic ' + Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
      const params = new URLSearchParams({
        To: `+91${cleanPhone}`,
        From: process.env.TWILIO_PHONE_NUMBER,
        Body: `Your Agnitra Spices login OTP is: ${otp}. Valid for 5 minutes.`
      });
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });
      const data = await response.json();
      console.log(`📡 [TWILIO DISPATCH] +91 ${cleanPhone} -> SID:`, data.sid || 'FAILED');
      return { provider: 'Twilio', success: !!data.sid, details: data };
    } catch (error) {
      console.error('❌ Twilio Dispatch Error:', error);
    }
  }

  return { provider: 'Console Logging (Add FAST2SMS_API_KEY or TWILIO credentials to backend/.env for live mobile SMS)', success: false };
}

// POST Send OTP via Phone Number
router.post('/auth/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit mobile phone number.' });
    }

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    // Generate 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins validity

    otpStore.set(cleanPhone, { otp: generatedOtp, expiresAt });

    console.log(`📱 [OTP GENERATED] +91 ${cleanPhone} -> OTP: ${generatedOtp}`);

    // Attempt real SMS gateway delivery
    const smsResult = await sendRealSmsOtp(cleanPhone, generatedOtp);

    res.json({
      success: true,
      message: smsResult.success 
        ? `Real SMS OTP delivered to +91 ${cleanPhone} via ${smsResult.provider}.`
        : `OTP dispatched for +91 ${cleanPhone}.`,
      otp: generatedOtp, // Included for testing until user adds real SMS API key
      smsStatus: smsResult,
      expiresInSeconds: 300
    });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
  }
});

// POST Verify OTP
router.post('/auth/verify-otp', (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone number and 6-digit OTP are required.' });
    }

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const storedData = otpStore.get(cleanPhone);

    // Accept generated OTP or universal testing OTP '123456'
    if (otp === '123456' || (storedData && storedData.otp === otp.toString() && Date.now() < storedData.expiresAt)) {
      otpStore.delete(cleanPhone);

      return res.json({
        success: true,
        message: 'Phone number verified! Login successful.',
        user: {
          phone: `+91 ${cleanPhone}`,
          isLoggedIn: true
        }
      });
    }

    res.status(400).json({ error: 'Invalid or expired OTP. Please check the 6-digit OTP and try again.' });
  } catch (err) {
    console.error('Error verifying OTP:', err);
    res.status(500).json({ error: 'OTP verification failed. Please try again.' });
  }
});

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

// PATCH update order status
router.patch('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    const updated = await dbService.updateOrderStatus(req.params.id, status);
    res.json({ success: true, updated });
  } catch (error) {
    console.error(`Error updating order ${req.params.id} status:`, error);
    res.status(500).json({ error: 'Failed to update order status' });
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

// POST submit customer feedback directly to Agnitra Admin
router.post('/feedback', async (req, res) => {
  try {
    const { name, email, rating, category, comments } = req.body;
    
    if (!name || !email || !comments) {
      return res.status(400).json({ error: 'Name, email, and feedback comments are required.' });
    }

    const subject = `[Customer Feedback - ${rating || 5} Stars] (${category || 'Spice Quality & Purity'})`;
    const message = `Rating: ${rating || 5}/5 Stars\nCategory: ${category || 'Spice Quality & Purity'}\nComments: ${comments}`;

    const savedMessage = await dbService.createMessage({ name, email, phone: '', subject, message });
    res.status(201).json({
      success: true,
      message: 'Thank you! Your feedback has been sent directly to Agnitra Admin.',
      savedMessage
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// GET all submitted contact messages & feedbacks
router.get('/messages', async (req, res) => {
  try {
    const messages = await dbService.getMessages();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

export default router;
