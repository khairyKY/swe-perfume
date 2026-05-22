const Product = require('../models/Product');

const listProducts = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit || '20', 10), 1),
      50,
    );
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Product.find({ isActive: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments({ isActive: true }),
    ]);

    return res.json({
      data: items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json({ data: product });
  } catch (err) {
    return next(err);
  }
};

module.exports = { listProducts, getProductById };
