import { gql } from '@apollo/client';

export const ALL_PLAYERS_QUERY = gql`
  query allPlayers {
    queryPlayer {
      name
      position
      country {
        id
        name
        stadium
      }
      club {
        id
        name
        stadium
      }
      id
    }
  }
`;

export const FILTER_PLAYERS_QUERY = gql`
  query filterPlayers(
    $filter: PlayerFilter
    $countryID: [ID!]
    $clubID: [ID!]
  ) {
    queryPlayer(filter: $filter) @cascade {
      name
      position
      country(filter: { id: $countryID }) {
        id
        name
      }
      club(filter: { id: $clubID }) {
        id
        name
      }
      id
    }
  }
`;
