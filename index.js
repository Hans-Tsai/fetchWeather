require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Weather = require('./models/weather');
const fetchWeather = require('./routes/fetchWeather');

/** creates an Express application */
const app = express();

app.use(express.json());

/** connect to MongoDB */
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('connected to MongoDB'))
    .catch(err => console.log(err));
const db = mongoose.connection;

app.use(express.json());
app.use('/fetchWeather', fetchWeather);

// const weatherDataRequest = axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-9E9FDB52-39FB-43B2-AEAF-9518B5B0C20C', {
//     params: {
//         locationName: '臺北,新屋,板橋',
//         elementName: 'TEMP,HUMD,Weather',
//         parameterName: 'CITY',
//         sort: 'stationId',
//       }
//     })
//     .then(function (res) {
//       console.dir(res.data, { depth: 10 });
//       res.data.records.location.forEach(current => {
//         const stationId = current.stationId;
//         const city = current.parameter[0].parameterValue;
//         const temp = current.weatherElement.find(d => d.elementName === 'TEMP').elementValue;
//         const humd = current.weatherElement.find(d => d.elementName === 'HUMD').elementValue;
//         const weatherDescription = current.weatherElement.find(d => d.elementName === 'Weather').elementValue;
//         const obsTime = current.time.obsTime;

//         const newWeather = new Weather({
//           "stationId": stationId, 
//           "city": city, 
//           "temp": temp, 
//           "humd": humd, 
//           "weatherDescription": weatherDescription, 
//           "observeTime": obsTime,
//           });
//         newWeather.save();
//       });
//       console.log('success');
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

const serverPort = 3000;
app.listen(serverPort, () => console.log('Server is started.'));

