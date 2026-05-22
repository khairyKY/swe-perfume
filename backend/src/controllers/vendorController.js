const Product = require('../models/Product');
const Order = require('../models/Order');
const { uploadImageBuffer } = require('../services/cloudinary');

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, imageUrl: imageUrlInput } = req.body;
    let imageUrl = '';

    if (imageUrlInput && req.file) {
      return res
        .status(400)
        .json({ error: 'Provide either imageUrl or image file, not both' });
    }

    if (imageUrlInput) {
      imageUrl = imageUrlInput;
    } else if (req.file) {
      imageUrl = await uploadImageBuffer(
        req.file.buffer,
        req.file.originalname,
      );
    }

    const product = await Product.create({
      vendorId: req.user.id,
      name,
      description,
      price,
      imageUrl,
    });

    return res.status(201).json(product);
  } catch (err) {
    return next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    if (req.user.role !== 'admin') {
      filter.vendorId = req.user.id;
    }

    const product = await Product.findOne(filter);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const {
      name,
      description,
      price,
      isActive,
      imageUrl: imageUrlInput,
    } = req.body;

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (isActive !== undefined) product.isActive = isActive;

    if (imageUrlInput && req.file) {
      return res
        .status(400)
        .json({ error: 'Provide either imageUrl or image file, not both' });
    }

    if (imageUrlInput) {
      product.imageUrl = imageUrlInput;
    } else if (req.file) {
      product.imageUrl = await uploadImageBuffer(
        req.file.buffer,
        req.file.originalname,
      );
    }

    await product.save();
    return res.json(product);
  } catch (err) {
    return next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    if (req.user.role !== 'admin') {
      filter.vendorId = req.user.id;
    }

    const product = await Product.findOne(filter);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.isActive = false;
    await product.save();

    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

const listVendorOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ vendorId: req.user.id }).sort({
      placedAt: -1,
    });
    return res.json({ data: orders });
  } catch (err) {
    return next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      vendorId: req.user.id,
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = req.body.status;
    await order.save();

    return res.json(order);
  } catch (err) {
    return next(err);
  }
};

const createProductsBulk = async (req, res, next) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Products array is required' });
    }

    if (products.length > 100) {
      return res.status(400).json({ error: 'Max 100 products per request' });
    }

    const docs = products.map((item) => ({
      vendorId: req.user.id,
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl || '',
    }));

    const created = await Product.insertMany(docs, { ordered: false });

    return res.status(201).json({
      count: created.length,
      data: created,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  listVendorOrders,
  updateOrderStatus,
  createProductsBulk,
};
