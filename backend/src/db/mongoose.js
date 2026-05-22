const mongoose = require('mongoose');
const config = require('../config');

mongoose.set('strictQuery', true);

const connectDb = async () => {
  if (!config.mongoUri) {
    throw new Error('MONGO_URI is not configured');
  }

  await mongoose.connect(config.mongoUri);
  return mongoose.connection;
};

module.exports = { connectDb };
