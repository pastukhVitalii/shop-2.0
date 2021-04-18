import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    marginTop: '30px',
  },
  media: {
    height: '100%',
    margin: '0 auto',
  },
  error: {
    color: 'tomato',
    fontSize: '14px',
  },
  price: {
    padding: '10px 0 0 10px'
  }
});