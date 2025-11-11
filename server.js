// server.js
const app = require('./app'); // import the app we just created
require('./src/utils/purgeJob');


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
