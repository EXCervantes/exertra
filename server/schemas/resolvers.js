const { User, Workout } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
// const stripe = require('stripe')(apitestkey)

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
                    .populate('workouts')
                    .select('-__v -password')
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            console.log("addUser")
            const user = await User.create({ username, email, password });
            console.log("user", user)
            const token = signToken(user);
            console.log("token", token)
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            console.log("login")
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect user details');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);

            return { token, user };
        },
        addWorkout: async (parent, { distance, time }, context) => {
            console.log({ distance, time })
            console.log({ context })
            if (context.user) {
                console.log("context.user._id", context.user._id)
                console.log({ distance, time })
                const workout = new Workout({ distance, time })
                console.log(workout)
                try {
                    await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $push: { workouts: workout } },
                    )
                } catch (error) {
                    console.error(error)
                }
                console.log("updatedUser")
                return workout
            }
            throw AuthenticationError('You need to be logged in!');
        }
    },
};

module.exports = resolvers
