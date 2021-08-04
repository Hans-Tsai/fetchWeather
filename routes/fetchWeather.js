const express = require('express');
const router = express.Router();
const Weather = require('../models/weather');

/** Getting all */
router.get('/', async (req, res) => {
  try {
    const allWeather = await Weather.find();
    res.json(allWeather);
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/** Getting one */
router.get('/:stationId', getWeather, (req, res) => {
  res.json(res.weather);
});

/** middleware function 
 * @description find one document by stationId
*/
async function getWeather(req, res, next) {
  let weather;
  try {
    weather = await Weather.findOne({ stationId: req.params.stationId });
    if (weather == null) return res.status(404).json({ message: 'Cannot find weather.' });
  } 
  catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // add a customized property `weather` into the `response` object
  res.weather = weather;
  next();
};

module.exports = router;
