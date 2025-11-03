const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  settings: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Preference', preferenceSchema);
