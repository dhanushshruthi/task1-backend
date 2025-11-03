const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  roles: { type: [String], required: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  audit: [
    {
      action: String,
      at: { type: Date, default: Date.now },
      details: Object,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
