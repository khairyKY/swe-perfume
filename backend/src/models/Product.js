const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  imageUrl: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
