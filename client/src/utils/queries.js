// Import gql to help handle queries
import { gql } from '@apollo/client';

// Define user query
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      workouts {
        _id
        distance
        time
      }
    }
  }
`;

export const QUERY_WORKOUT = gql`
  query getWorkout {
    workouts {
      _id
      distance
      time
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      workouts {
        _id
        distance
        time
      }
    }
  }
`;
