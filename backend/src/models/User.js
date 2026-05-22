const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'vendor', 'admin'], default: 'user' },
  name: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function onSave() {
  if (!this.isModified('password')) {
    return;
  }

  const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
  this.password = hash;
});

UserSchema.methods.comparePassword = function comparePassword(plainText) {
  return bcrypt.compare(plainText, this.password);
};

module.exports = mongoose.model('User', UserSchema);
