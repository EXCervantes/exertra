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
    mutation addWorkout(
        $userId: ID!,
        $distance: Float!,
        $time: Float!,
        # $polyline: String!
        ) {
        addWorkout(
            userId: $userId,
            distance: $distance,
            time: $time,
            # polyline: $polyline
            ) {
            id
            userId
            distance
            time
            # polyline
    }
  }
`;

// export const CREATE_SPLIT = gql`
//   mutation createSplit(
//     $workoutId: ID!,
//     $distance: Float!,
//     $time: Float!,
//     $pace: Float!,
//     $timePerMeter: Float!
//     ) {
//     createSplit(
//         workoutId: $workoutId,
//         distance: $distance,
//         time: $time,
//         pace: $pace,
//         timePerMeter: $timePerMeter
//         ) {
//         id
//         workoutId
//         distance
//         time
//         pace
//         timePerMeter
//     }
//   }
// `;
