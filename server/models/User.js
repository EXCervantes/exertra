const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const workout = require('./Workout');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true
        }
    }
)

const User = model('User', userSchema)

module.exports = User;
