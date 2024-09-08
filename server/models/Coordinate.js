// Referenced data, might delete later
const { Schema, model } = require('mongoose');

const coordinateSchema = new Schema(
    {

    }
)

const Coordinate = model('Coordinate', coordinateSchema);

module.exports = User;