const { Schema } = require('mongoose');

const workoutSchema = new Schema(
    {
        distance: {
            type: Float,
            require: true,
        },
        totalTime: {
            type: String,
        },
        workoutType: {
            type: String,
            require: true,
        }
    }
)

module.exports = workoutSchema
