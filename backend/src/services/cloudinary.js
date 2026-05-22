const cloudinary = require('cloudinary').v2;
const config = require('../config');

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const uploadImageBuffer = (buffer, filename) =>
  new Promise((resolve, reject) => {
    if (!config.cloudinary.cloudName) {
      return reject(new Error('Cloudinary is not configured'));
    }

    const stream = cloudinary.uploader.upload_stream(
      { public_id: filename, resource_type: 'image' },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.secure_url);
      },
    );

    stream.end(buffer);
  });

module.exports = { uploadImageBuffer };
