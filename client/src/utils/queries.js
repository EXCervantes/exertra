// Import gql to help handle queries
import { gql } from '@apollo/client';

// Define user query
export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      _id
      username
      email
      workout {
        _id
        distance
        time
      }
    }
  }
`;

export const GET_WORKOUT = gql`
  query getWorkout($id: ID!) {
    getWorkout(id: $id) {
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
      workout {
        id
        distance
        time
      }
    }
  }
`;
