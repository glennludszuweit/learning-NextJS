import { gql } from '@apollo/client';

export const ALL_COUNTRIES_QUERY = gql`
  query allCountries {
    queryCountry {
      id
      name
      stadium
    }
  }
`;
