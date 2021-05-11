import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    marginTop: '30px',
    width: 'max-content',
  },
  form_item: {
    margin: '20px ',
    width: 'calc(100% - 40px)',
  },
  error: {
    color: 'tomato',
    marginLeft: '20px',
    lineHeight: '0',
  },
  form_label: {
    paddingLeft: '20px',
    color: 'black',
  },
});