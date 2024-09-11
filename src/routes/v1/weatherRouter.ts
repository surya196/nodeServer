const express = require('express');
const router = express.Router();
const weatherController = require('../../controller/weatherController');

const weatherRoute = router.get('/:period', function (req: any, res: any) { weatherController });

module.exports = weatherRoute;