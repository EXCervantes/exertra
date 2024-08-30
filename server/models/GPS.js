const { Schema } = require('mongoose');

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

module.exports = gpsSchema