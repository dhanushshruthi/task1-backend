const cron = require('node-cron');
const User = require('../models/user.model');

// Runs every hour to check for expired soft-deleted users
cron.schedule('0 * * * *', async () => {
  console.log('🕐 Running purge job...');

  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

  try {
    const result = await User.deleteMany({
      isDeleted: true,
      deletedAt: { $lte: cutoff },
    });
    console.log(`✅ Purged ${result.deletedCount} users`);
  } catch (err) {
    console.error('❌ Error purging users:', err.message);
  }
});
