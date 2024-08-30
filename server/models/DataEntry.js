const { schema } = require('mongoose')

const dataEntryschema = new Schema(
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

module.exports = dataEntryschema
