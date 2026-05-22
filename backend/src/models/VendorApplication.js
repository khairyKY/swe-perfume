const mongoose = require('mongoose');

const VendorAppSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  brandName: { type: String, required: true, trim: true },
  bio: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('VendorApplication', VendorAppSchema);
