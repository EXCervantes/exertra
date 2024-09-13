const typeDefs = /* GraphQL */ `
type User {
  _id: ID
  username: String
  email: String!
  workouts: [Workout]
}

type Workout {
  _id: ID
  distance: Float!
  time: Float!
}


type Auth {
  token: ID
  user: User
}

type Query {
  me: User
  workouts(_id: ID!): [Workout]
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  addWorkout(distance: Float!, time: Float!): User
}

`;

module.exports = typeDefs;
