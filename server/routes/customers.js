import { Router } from 'express';
import Customer from '../models/Customer.js';

const router = Router();

// GET /api/customers — all customers, newest first
router.get('/', async (req, res, next) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    next(err);
  }
});

// POST /api/customers — add a customer
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existing = await Customer.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    const customer = await Customer.create({ name, email, phone, address });
    res.status(201).json({ success: true, message: 'Customer added successfully', customer });
  } catch (err) {
    next(err);
  }
});

export default router;
