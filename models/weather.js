const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Schema is going to define the structure of the document inside the collection */
const weatherSchema = new Schema({
    stationId: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    temp: {
        type: String,
    },
    humd: {
      type: String,
    },
    weatherDescription: {
      type: String,
    },
    observeTime: {
      type: String,
    },
}, { timestamps: true });

/** Model is the thing that based on the specified schema and then provide us with an interface
 * by which to communicate with a database collection for that document type
 */
const Weather = mongoose.model('Weather', weatherSchema);
module.exports = Weather;