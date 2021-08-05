const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Schema is going to define the structure of the document inside the collection */
const apikeySchema = new Schema({
    apikey: {
        type: String,
        required: true,
    },
}, { timestamps: true });

/** Model is the thing that based on the specified schema and then provide us with an interface
 * by which to communicate with a database collection for that document type
 */
const Apikey = mongoose.model('Apikey', apikeySchema);
module.exports = Apikey;