require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
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

const serverPort = 3000;
app.listen(serverPort, () => console.log('Server is started.'));

