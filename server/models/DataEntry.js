// Reference data, might delete later
const { Schema, model } = require('mongoose')

const dataEntrySchema = new Schema(
    {
        time: {
            type: String,
            required: true,
        },
        coords: {
            type: {
                latitude: {
                    type: String,
                    required: true,
                },
                longitude: {
                    type: String,
                    required: true,
                }
            },
            required: true,
        }
    }
)

const Logs = model('DataEntry', dataEntrySchema);


module.exports = Logs
