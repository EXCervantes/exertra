const { Schema, model } = require('mongoose');
const DataEntry = require('./DataEntry')

const workoutSchema = new Schema(
    {
        distance: {
            type: String,
            required: true,
        },
        totalTime: {
            type: String,
        },
        averagePace: {
            type: Number,
            required: true,
        },
        workoutType: {
            type: String,
            required: true,
        },
        // splits: [
        //     {
        //         startCoord: ,
        //         stopCoord,
        //         distance,
        //         time,
        //         pace,
        //     },
        // ],
        dataEntries: [DataEntry.schema]
    }
)

const Workout = model('Workout', workoutSchema);

module.exports = Workout
