import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import { loginTC, registerGoogleTC } from '../../BLL-redux/auth-reducer';
import { AppRootStateType } from '../../BLL-redux/store';
import { maxLengthCreator, required } from '../../utils/validators';
import {useStyles} from './index';

export type UserType = {
  email: string;
  firstName?: string;
  lastName?: string;
  pass: string;
  phoneNumber?: string
};

export const Login = React.memo(() => {
  console.log('login page');
  const classes = useStyles();

  const formik = useFormik({
    validate: (values) => {
      if (!values.email) {
        return {
          email: required(values.email),
        };
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        return {
          email: 'Invalid email',
        };
      }
      if (!values.pass) {
        return {
          pass: required(values.pass),
        };
      } else if (values.pass.length > 15) {
        return {
          pass: maxLengthCreator(values.pass, 15),
        };
      }
    },
    initialValues: {
      email: '',
      pass: '',
    },

    onSubmit: (values) => {
      dispatch(loginTC(values));
    },
  });

  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn,
  );

  const dispatch = useDispatch();

  const signInWithGoogle = () => {
    dispatch(registerGoogleTC());
  };

  if (isLoggedIn) {
    return <Redirect to={'/'} />;
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={7}>
        <Paper>
          <form onSubmit={formik.handleSubmit}>
            <FormControl className={classes.root}>
              <FormGroup>
                <TextField
                  label="Email"
                  variant={'filled'}
                  {...formik.getFieldProps('email')}
                  className={classes.form_item}
                />
                {formik.errors.email ? <div className={classes.error}>{formik.errors.email}</div> : null}
                <TextField
                  label="Password"
                  variant={'filled'}
                  {...formik.getFieldProps('pass')}
                  className={classes.form_item}
                />
                {formik.errors.pass ? <div className={classes.error}>{formik.errors.pass}</div> : null}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.form_item}
                >
                  Sign in
                </Button>
                <Typography align={'center'}>or</Typography>
                <Button
                  variant="contained"
                  color={'primary'}
                  className={classes.form_item}
                >
                  <NavLink style={{ color: 'white' }} to={'/register'}>
                    {' '}
                    Sign up{' '}
                  </NavLink>
                </Button>
              </FormGroup>
              <Button
                variant="contained"
                color={'primary'}
                onClick={signInWithGoogle}
                className={classes.form_item}
              >
                Continue with Google
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
});