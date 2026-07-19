import { Router } from 'express';
import mongoose from 'mongoose';
import Customer from '../models/Customer.js';
import Service from '../models/Service.js';

const router = Router();

// GET /api/services — all services, newest first
router.get('/', async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    next(err);
  }
});

// POST /api/services — add a service request
router.post('/', async (req, res, next) => {
  try {
    const { customerId, serviceType, description, priority } = req.body;

    if (!customerId || !serviceType || !description || !priority) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (!mongoose.isValidObjectId(customerId)) {
      return res.status(400).json({ success: false, message: 'Invalid customer ID' });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const service = await Service.create({
      customer: customer._id,
      customerName: customer.name,
      serviceType,
      description,
      priority
    });

    res.status(201).json({ success: true, message: 'Service request added successfully', service });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/services/:id — update service status
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid service ID' });
    }
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const service = await Service.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ success: false, message: 'No service found with that ID' });
    }

    res.json({ success: true, message: 'Service status updated successfully', service });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/services/:id — delete a service request
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid service ID' });
    }

    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'No service found with that ID' });
    }

    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
