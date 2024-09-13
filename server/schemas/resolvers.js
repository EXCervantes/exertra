const { User, Workout } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

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
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
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
            if (context.user) {
                const workout = new Workout({ distance, time })
                try {
                    await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $push: { workouts: workout } },
                    )
                } catch (error) {
                    console.error(error)
                }
                return workout
            }
            throw AuthenticationError('You need to be logged in!');
        }
    },
};

module.exports = resolvers
