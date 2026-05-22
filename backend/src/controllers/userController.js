const VendorApplication = require('../models/VendorApplication');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

const applyForVendor = async (req, res, next) => {
  try {
    const { brandName, bio } = req.body;
    const existing = await VendorApplication.findOne({
      userId: req.user.id,
      status: 'pending',
    });

    if (existing) {
      return res.status(400).json({ error: 'Application already pending' });
    }

    const app = await VendorApplication.create({
      userId: req.user.id,
      brandName,
      bio,
    });

    return res.status(201).json(app);
  } catch (err) {
    return next(err);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body;
    const productIds = items.map((item) => item.productId);
    const products = await Product.find({
      _id: { $in: productIds },
      isActive: true,
    });

    if (products.length !== new Set(productIds).size) {
      return res.status(400).json({ error: 'Invalid products in order' });
    }

    const productMap = new Map(
      products.map((product) => [product._id.toString(), product]),
    );

    const vendorId = products[0].vendorId.toString();
    const orderItems = items.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new Error('Invalid product in order');
      }
      if (product.vendorId.toString() !== vendorId) {
        throw new Error('All items must be from the same vendor');
      }

      return {
        productId: product._id,
        quantity: item.quantity,
        priceAtTime: product.price,
      };
    });

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.quantity * item.priceAtTime,
      0,
    );

    const order = await Order.create({
      customerId: req.user.id,
      vendorId,
      items: orderItems,
      totalAmount,
      shippingAddress,
    });

    return res.status(201).json(order);
  } catch (err) {
    if (err.message && err.message.includes('same vendor')) {
      return res.status(400).json({ error: err.message });
    }
    if (err.message && err.message.includes('Invalid product')) {
      return res.status(400).json({ error: 'Invalid products in order' });
    }
    return next(err);
  }
};

const listMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customerId: req.user.id }).sort({
      placedAt: -1,
    });
    return res.json({ data: orders });
  } catch (err) {
    return next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(
      'email name role createdAt',
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ data: user });
  } catch (err) {
    return next(err);
  }
};

const deleteMe = async (req, res, next) => {
  try {
    const result = await User.deleteOne({ _id: req.user.id });
    if (!result.deletedCount) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const isOwner = order.customerId.toString() === req.user.id;
    const isVendor = order.vendorId.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isVendor && !isAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    return res.json({ data: order });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  applyForVendor,
  createOrder,
  listMyOrders,
  getProfile,
  deleteMe,
  getOrderById,
};
