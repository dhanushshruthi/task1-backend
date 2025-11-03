const prefService = require('../services/preference.service');

exports.upsertPreference = async (req, res) => {
  try {
    const result = await prefService.upsertPreference(req.params.userId, req.body.settings);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPreference = async (req, res) => {
  try {
    const pref = await prefService.getPreference(req.params.userId);
    res.json(pref);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
