const { Schema } = require('mongoose');

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

const Workout = mongoose.model('Workout', workoutSchemaSchema);

module.exports = Workout
