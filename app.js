// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const routes = require('./src/routes/index');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/v1', routes);

module.exports = app; // exported for testing
