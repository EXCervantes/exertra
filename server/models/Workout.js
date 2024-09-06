const { Schema, model } = require('mongoose');

const workoutSchema = new Schema(
    {
        distance: {
            type: String,
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

const Workout = model('Workout', workoutSchema);

module.exports = Workout
