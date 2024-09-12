// Import gql to help handle mutations
import { gql } from '@apollo/client';

// Handle logging in user and export
export const LOGIN_USER = gql`
  mutation login(
    $email: String!,
    $password: String!
    ) {
    login(
        email: $email,
        password: $password) {
        token
        user {
            _id
        }
    }
  }
`;

// Handle adding a user and export
export const ADD_USER = gql`
  mutation addUser(
    $username: String!,
    $email: String!,
    $password: String!
    ) {
    addUser(
        username: $username,
        email: $email,
        password: $password) {
        token
        user {
            _id
        }
    }
  }
`;

// Handle adding log data
export const ADD_WORKOUT = gql`
  mutation addWorkout($distance: Float!, $time: Float!) {
    addWorkout(distance: $distance, time: $time) {
      _id
    }
  }
`;

