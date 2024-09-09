// Import gql to help handle queries
import { gql } from '@apollo/client';

// Define user query
const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      routes {
        id
        distance
        time
        # splits {
        #   id
        #   distance
        #   time
        #   pace
        #   timePerMeter
        # }
      }
    }
  }
`;

const GET_WORKOUT = gql`
  query getWorkout($id: ID!) {
    getRoute(id: $id) {
      id
      userId
      distance
      time
      # splits {
      #   id
      #   distance
      #   time
      #   pace
      #   timePerMeter
      # }
    }
  }
`;

// const GET_SPLITS = gql`
//   query getSplits($routeId: ID!) {
//     getSplits(routeId: $routeId) {
//       id
//       distance
//       time
//       pace
//       timePerMeter
//     }
//   }
// `;

const CREATE_WORKOUT = gql`
  mutation CreateRoute($userId: ID!, $distance: Float!, $time: Float!, $polyline: String!) {
    createRoute(userId: $userId, distance: $distance, time: $time, polyline: $polyline) {
      id
      userId
      distance
      time
      polyline
    }
  }
`;

const CREATE_SPLIT = gql`
  mutation CreateSplit($routeId: ID!, $distance: Float!, $time: Float!, $pace: Float!, $timePerMeter: Float!) {
    createSplit(routeId: $routeId, distance: $distance, time: $time, pace: $pace, timePerMeter: $timePerMeter) {
      id
      routeId
      distance
      time
      pace
      timePerMeter
    }
  }
`;