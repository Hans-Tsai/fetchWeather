const express = require('express');
const router = express.Router();
const axios = require('axios');
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

/** save all weather into MongoDB actively */
router.get('/fetch/:apiKey', checkAuthKey, fetchAllAndSave, (req, res) => {
  res.status(200).json({ 'message': 'fetch all weather data and save them into MongoDB successfully.' });
});

/** Getting one */
router.get('/:apiKey/:stationId', checkAuthKey, getWeather, (req, res) => {
  res.json(res.weather);
});

//#region middleware functions
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

/** middleware function
 * @description fetch all weather from Open API and save them into MongoDB actively
 */
async function fetchAllAndSave(req, res, next) {
  const apiKey = req.params.apiKey;
  const weatherDataRequest = axios.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${apiKey}`, {
    params: {
        locationName: '臺北,新屋,板橋',
        elementName: 'TEMP,HUMD,Weather',
        parameterName: 'CITY',
        sort: 'stationId',
      }
    })
    .then(function (res) {
      // console.dir(res.data, { depth: 10 });
      res.data.records.location.forEach(current => {
        const stationId = current.stationId;
        const city = current.parameter[0].parameterValue;
        const temp = current.weatherElement.find(d => d.elementName === 'TEMP').elementValue;
        const humd = current.weatherElement.find(d => d.elementName === 'HUMD').elementValue;
        const weatherDescription = current.weatherElement.find(d => d.elementName === 'Weather').elementValue;
        const obsTime = current.time.obsTime;
  
        const newWeather = new Weather({
          "stationId": stationId, 
          "city": city, 
          "temp": temp, 
          "humd": humd, 
          "weatherDescription": weatherDescription, 
          "observeTime": obsTime,
          });
        newWeather.save();
      });
      console.log('success');
    })
    .catch(function (error) {
      console.log(error);
    });
  next();
}

//#endregion

module.exports = router;
