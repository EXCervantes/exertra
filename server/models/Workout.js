const { Schema, model } = require('mongoose');

const workoutSchema = new Schema(
    {
        distance: {
            type: Number,
            required: true,
        },
        time: {
            type: Number,
            required: true,
        },
    }
)

const Workout = model('Workout', workoutSchema);

module.exports = Workout
