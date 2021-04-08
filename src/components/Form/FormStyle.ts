import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    marginTop: '30px',
  },
  form_item: {
    margin: '20px ',
    width: 'calc(100% - 40px)',
  },
  error: {
    color: "tomato",
    marginLeft: '20px',
    lineHeight: '0',
  }
});
