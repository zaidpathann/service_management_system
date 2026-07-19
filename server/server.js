import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import customersRouter from './routes/customers.js';
import servicesRouter from './routes/services.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "Backend is running",
    message: "Service Management System API"
  });
});
app.use('/api/customers', customersRouter);
app.use('/api/services', servicesRouter);

// Error handler: mongoose validation -> 400, duplicate key -> 409, else 500
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((e) => e.message).join(', ');
    return res.status(400).json({ success: false, message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: 'Email already exists' });
  }
  console.error(err);
  res.status(500).json({ success: false, message: 'Server error' });
});

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not set. Copy server/.env.example to server/.env and add your Atlas connection string.');
  process.exit(1);
}

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
} catch (err) {
  console.error('MongoDB connection failed:', err.message);
  process.exit(1);
}
