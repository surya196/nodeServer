const express = require('express');
const router = express.Router();
const weatherController = require('../../controller/weatherController');

const weatherRoute = router.get('/:period', weatherController.getWeatherAndSMA);

module.exports = weatherRoute;