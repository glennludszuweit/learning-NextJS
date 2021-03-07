import { gql } from '@apollo/client';

export const ALL_CLUBS_QUERY = gql`
  query allClubs {
    queryClub {
      id
      name
      stadium
    }
  }
`;
