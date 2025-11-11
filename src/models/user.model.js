const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  roles: [{ type: String }],
  isDeleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true } // ✅ New field
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
