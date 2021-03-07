import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStyles } from './styles';
import { ButtonBase, TextField } from '@material-ui/core';

function PayersList({
  dataset,
  searchPlayers,
  clearSearch,
  allClubs,
  allCountries,
  club,
  setClub,
  country,
  setCountry,
  searchText,
  setSearchText,
  positions,
  position,
  setPosition,
}) {
  const classes = useStyles();

  console.log(dataset);

  return (
    <>
      <div className={classes.filterContainer}>
        <Autocomplete
          id='combo-box-country'
          options={allCountries}
          getOptionLabel={(option) => option.name}
          value={country}
          className={classes.input}
          size='small'
          renderInput={(params) => (
            <TextField {...params} label='Country' variant='outlined' />
          )}
          onChange={(e, value) =>
            value
              ? setCountry({
                  id: value.id,
                  name: value.name,
                })
              : setCountry(null)
          }
        />
        <Autocomplete
          id='combo-box-club'
          options={allClubs}
          getOptionLabel={(option) => option.name}
          value={club}
          className={classes.input}
          size='small'
          renderInput={(params) => (
            <TextField {...params} label='Club' variant='outlined' />
          )}
          onChange={(e, value) =>
            value
              ? setClub({
                  id: value.id,
                  name: value.name,
                })
              : setClub(null)
          }
        />
        <Autocomplete
          id='combo-box-pos'
          options={positions}
          value={position}
          getOptionLabel={(option) => option}
          className={classes.input}
          size='small'
          renderInput={(params) => (
            <TextField {...params} label='Position' variant='outlined' />
          )}
          onChange={(e, value) => setPosition(value)}
        />
        <TextField
          id='outlined-basic'
          label='Player'
          variant='outlined'
          value={searchText}
          className={classes.input}
          size='small'
          onChange={(event) => setSearchText(event.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={searchPlayers}
        >
          Search
        </Button>
        <Button
          variant='contained'
          color='default'
          className={classes.button}
          onClick={clearSearch}
        >
          Clear
        </Button>
      </div>
      <Grid style={{ marginTop: '20px' }} container spacing={2}>
        {dataset.map((player) => (
          <Grid item xs={12} s={6} md={4} lg={3} key={player.id}>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color='textPrimary'
                  gutterBottom
                >
                  {player.name}
                </Typography>
                <Typography className={classes.pos} color='textSecondary'>
                  {player.club.name}
                </Typography>
                <Typography variant='body2' component='p'>
                  Position - {player.position}
                  <br />
                  Country - {player.country.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default PayersList;
