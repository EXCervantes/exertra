const typeDefs = /* GraphQL */ `
type Query {
  me: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
}

type User {
  _id: ID
  username: String
  email: String!
  exerciseLog: String
}

# type Book {
#   bookId: String
#   authors: [String]
#   description: String
#   title: String
#   image: String
#   link: String
# }

# input bookInput {
#   authors: [String]
#   description: String
#   title: String
#   bookId: String
#   image: String
#   link: String
# }

type Auth {
  token: ID!
  user: User
}
`;

module.exports = typeDefs;