const mongoose = require('mongoose');
const VendorApplication = require('../models/VendorApplication');
const User = require('../models/User');
const Product = require('../models/Product');

const listApplications = async (req, res, next) => {
  try {
    const status = req.query.status || 'pending';
    const apps = await VendorApplication.find({ status }).sort({
      appliedAt: -1,
    });
    return res.json({ data: apps });
  } catch (err) {
    return next(err);
  }
};

const approveApplication = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const app = await VendorApplication.findById(req.params.id).session(
      session,
    );

    if (!app) {
      await session.abortTransaction();
      return res.status(404).json({ error: 'Application not found' });
    }

    if (app.status !== 'pending') {
      await session.abortTransaction();
      return res.status(400).json({ error: 'Application already processed' });
    }

    app.status = 'approved';
    await app.save({ session });

    await User.updateOne({ _id: app.userId }, { role: 'vendor' }, { session });

    await session.commitTransaction();
    return res.json({ success: true });
  } catch (err) {
    await session.abortTransaction();

    if (
      err.message &&
      err.message.includes(
        'Transaction numbers are only allowed on a replica set member',
      )
    ) {
      try {
        const app = await VendorApplication.findById(req.params.id);
        if (!app) {
          return res.status(404).json({ error: 'Application not found' });
        }

        if (app.status !== 'pending') {
          return res
            .status(400)
            .json({ error: 'Application already processed' });
        }

        app.status = 'approved';
        await app.save();
        await User.updateOne({ _id: app.userId }, { role: 'vendor' });

        return res.json({ success: true, transaction: 'skipped' });
      } catch (fallbackErr) {
        return next(fallbackErr);
      }
    }

    return next(err);
  } finally {
    session.endSession();
  }
};

const rejectApplication = async (req, res, next) => {
  try {
    const app = await VendorApplication.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (app.status !== 'pending') {
      return res.status(400).json({ error: 'Application already processed' });
    }

    app.status = 'rejected';
    await app.save();

    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
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

const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('email name role createdAt');
    return res.json({ data: users });
  } catch (err) {
    return next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (!result.deletedCount) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  listApplications,
  approveApplication,
  rejectApplication,
  removeProduct,
  listUsers,
  deleteUser,
};
