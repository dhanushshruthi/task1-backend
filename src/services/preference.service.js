const Preference = require('../models/preference.model');
const User = require('../models/user.model');

// Add or Update Preference
exports.upsertPreference = async (userId, settings) => {
  const user = await User.findOne({ _id: userId, isDeleted: false });
  if (!user) throw new Error('User not found or deleted');
  const preference = await Preference.findOneAndUpdate(
    { userId },
    { settings },
    { new: true, upsert: true }
  );
  return preference;
};

// Get Preference
exports.getPreference = async (userId) => {
  const pref = await Preference.findOne({ userId });
  if (!pref) throw new Error('Preference not found');
  return pref;
};
