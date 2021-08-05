const express = require('express');
const router = express.Router();
const Weather = require('../models/weather');
const Apikey = require('../models/apikey');

/** Getting all */
router.get('/:apiKey', checkAuthKey, async (req, res) => {
  try {
    const allWeather = await Weather.find();
    res.json(allWeather);
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/** Getting one */
router.get('/:apiKey/:stationId', checkAuthKey, getWeather, (req, res) => {
  res.json(res.weather);
});

/** middleware function
 * @description check the Authorization Key 
 */
async function checkAuthKey(req, res, next) {
  let apiKey;
  try {
    apiKey = await Apikey.findOne({ apikey: req.params.apiKey });
    if (apiKey == null) return res.status(404).json({ message: 'Unauthorized API key.' });
  } 
  catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // add a customized property `apikey` into the `response` object
  res.apiKey = apiKey;
  next();
};

/** middleware function 
 * @description find one document by stationId
*/
async function getWeather(req, res, next) {
  let weather;
  try {
    weather = await Weather.findOne({ stationId: req.params.stationId });
    if (weather == null) return res.status(404).json({ message: 'Cannot find weather by this stationId.' });
  } 
  catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // add a customized property `weather` into the `response` object
  res.weather = weather;
  next();
};

module.exports = router;
