const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const routes = require('./src/routes/index');

dotenv.config();
connectDB();

const app = express();

// ✅ enable CORS so frontend (3000) can call backend (5000)
app.use(cors());

app.use(express.json());
app.use('/api/v1', routes);

module.exports = app;
