// Import gql to help handle queries
import { gql } from '@apollo/client';

// Define user query and export
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      workouts {
        workoutId
      }
    }
  }
`;