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

const GPS = mongoose.model('GPS', gpsSchema);


module.exports = GPS