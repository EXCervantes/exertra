const { Schema } = require('mongoose')

const dataLogSchema = new Schema(
    {
        time: {
            type: String,
            required: true,
        },
        positionX: {
            type: String,
            required: true,
        },
        positionY: {
            type: String,
            required: true,
        }
    }
)

const Logs = mongoose.model('Logs', dataLogSchema);


module.exports = Logs
