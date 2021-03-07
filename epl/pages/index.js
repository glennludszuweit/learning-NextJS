import { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { initializeApollo } from '../lib/apolloClient';
import { ALL_CLUBS_QUERY } from '../lib/queries/clubs';
import { ALL_COUNTRIES_QUERY } from '../lib/queries/countries';
import {
  ALL_PLAYERS_QUERY,
  FILTER_PLAYERS_QUERY,
} from '../lib/queries/players';
import PlayersList from '../components/PlayersList/PayersList';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);
  const [country, setCountry] = useState(null);
  const [club, setClub] = useState(null);
  const [position, setPosition] = useState(null);

  const {
    loading: playersLoading,
    error: playersError,
    data: players,
  } = useQuery(ALL_PLAYERS_QUERY);

  const {
    loading: countriesLoading,
    error: countriesError,
    data: countries,
  } = useQuery(ALL_COUNTRIES_QUERY);

  const { loading: clubsLoading, error: clubsError, data: clubs } = useQuery(
    ALL_CLUBS_QUERY
  );

  const [
    getFilteredPlayers,
    { loading: filterLoading, error: filterError, data: filteredPlayers },
  ] = useLazyQuery(FILTER_PLAYERS_QUERY);

  const positions = [
    'GK',
    'RB',
    'LB',
    'CB',
    'DM',
    'CM',
    'LM',
    'RM',
    'CF',
    'ST',
  ];

  const clearSearch = () => {
    setClub(null);
    setCountry(null);
    setPosition(null);
    setSearchText('');
    setSearchStatus(false);
  };

  const searchPlayers = () => {
    let filter = {};
    setSearchStatus(true);
    if (position) {
      filter.position = { eq: position };
    }
    if (searchText !== '') {
      filter.name = { anyoftext: searchText };
    }
    if (Object.keys(filter).length === 0) {
      if (!club && !country) {
        setSearchStatus(false);
        return;
      }
    }
    getFilteredPlayers({
      variables: {
        filter: filter,
        clubID: club ? [club] : allClubs.map((club) => club.id),
        countryID: country
          ? [country.id]
          : allCountries.map((country) => country.id),
      },
    });
  };

  if (playersLoading || countriesLoading || clubsLoading || filterLoading)
    return <div>Error loading players.</div>;
  if (playersError || countriesError || clubsError || filterError)
    return <div>Loading</div>;

  const { queryPlayer: allPlayers } = players;
  const { queryClub: allClubs } = clubs;
  const { queryCountry: allCountries } = countries;
  const dataset =
    searchStatus && filteredPlayers ? filteredPlayers?.queryPlayer : allPlayers;

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>EPL Players Directory</h1>
      <PlayersList
        dataset={dataset}
        searchPlayers={searchPlayers}
        clearSearch={clearSearch}
        allClubs={allClubs}
        allCountries={allCountries}
        club={club}
        setClub={setClub}
        country={country}
        setCountry={setCountry}
        searchText={searchText}
        setSearchText={setSearchText}
        positions={positions}
        position={position}
        setPosition={setPosition}
      />
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_COUNTRIES_QUERY,
  });

  await apolloClient.query({
    query: ALL_CLUBS_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}
