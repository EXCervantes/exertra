const { Schema, model } = require('mongoose');

const gpsSchema = new Schema(
    {
        waypoint: {
            type: String,
        },
        split: {
            type: String
        }
    }
)

const GPS = model('GPS', gpsSchema);


module.exports = GPS