require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan'); // Logging middleware
const routes = require('./routes'); // Import your routes

app.use(cors());
app.use(morgan('dev')); // Logging middleware
app.use(express.json());

app.use('/api', routes);  // Set up your API routes under "/api"

// 👇 This runs mqtt.js when app starts
require('./services/mqtt');

module.exports = app;