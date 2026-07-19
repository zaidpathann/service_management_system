import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    customerName: { type: String, required: true, trim: true },
    serviceType: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
    // Kept as a YYYY-MM-DD string to match the original app's date handling
    // (the monthly report groups by date.substring(0, 7))
    date: { type: String, default: () => new Date().toISOString().slice(0, 10) }
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
