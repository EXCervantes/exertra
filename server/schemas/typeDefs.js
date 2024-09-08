const typeDefs = /* GraphQL */ `
type User {
  _id: ID
  username: String!
  email: String!
  workouts: [Workout]
}

type Workout {
  workoutId: ID!
  userId: ID!
  distance: Float!
  time: Float!
  # splits: [Split]
  # polyline: String!
}

# type Split {
#   id: ID!
#   workoutId: ID!
#   distance: Float!
#   time: Float!
#   pace: Float!
#   timePerMeter: Float!
# }

type Auth {
  token: ID!
  user: User
}

type Query {
  user: User
  workouts(_id: ID!): [Workout]
  # getSplits(workoutId: ID!): [Split]!
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  addWorkout(userId: ID!, distance: Float!, time: Float!, polyline: String!): Workout
  # createSplit(routeId: ID!, distance: Float!, time: Float!, pace: Float!, timePerMeter: Float!): Split
  updateWorkout(id: ID!, distance: Float!, time: Float!): Workout
  # updateSplit(id: ID!, distance: Float!, time: Float!, pace: Float!, timePerMeter: Float!): Split

}

`;

module.exports = typeDefs;
