import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
    fontSize: 12,
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    margin: '5px',
  },
  button: {
    margin: '5px',
  },
  [theme.breakpoints.down('sm')]: {
    filterContainer: {
      flexDirection: 'column',
    },
    input: {
      width: '100%',
    },
    button: {
      width: '100%',
    },
  },
}));
