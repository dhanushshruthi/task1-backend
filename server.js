const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const routes = require('./src/routes/index');

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // to parse JSON input

app.use('/api/v1', routes); // base route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
