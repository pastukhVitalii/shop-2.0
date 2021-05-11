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

import { loginTC, registerGoogleTC } from '../../redux/auth-reducer';
import { AppRootStateType } from '../../redux/store';
import {getEmailError, getMaxLengthError, getRequiredError} from '../../utils/validators';
import { useStyles } from './index';
import {MAX_FIELD_LENGTH, VALIDATION_ERRORS} from "../../utils/constants";

export type UserType = {
  email: string;
  firstName?: string;
  lastName?: string;
  pass: string;
  phoneNumber?: string;
};

export const Login = React.memo(() => {
  const classes = useStyles();

  const formik = useFormik({
    validate: (values) => {
      if (getRequiredError(values.email)) {
        return {
          email: VALIDATION_ERRORS.REQUIRED_FIELD,
        };
      } else if (getEmailError(values.email)) {
        return {
          email: VALIDATION_ERRORS.INVALID_EMAIL,
        };
      }
      if (getRequiredError(values.pass)) {
        return {
          pass: VALIDATION_ERRORS.REQUIRED_FIELD,
        };
      } else if (getMaxLengthError(values.pass, MAX_FIELD_LENGTH)) {
        return {
          pass: VALIDATION_ERRORS.MAX_LENGTH(MAX_FIELD_LENGTH),
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
    return <Redirect to='/' />;
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
                  variant='filled'
                  {...formik.getFieldProps('email')}
                  className={classes.form_item}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className={classes.error}>{formik.errors.email}</div>
                )}
                <TextField
                  label="Password"
                  variant='filled'
                  {...formik.getFieldProps('pass')}
                  className={classes.form_item}
                />
                {formik.touched.pass && formik.errors.pass && (
                  <div className={classes.error}>{formik.errors.pass}</div>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.form_item}
                  aria-labelledby='sign in'
                >
                  Sign in
                </Button>
                <Typography align='center'>or</Typography>
                <Button
                  variant="contained"
                  color='primary'
                  className={classes.form_item}
                  aria-labelledby='sign up'
                >
                  <NavLink className={classes.link} to='/register'>
                    Sign up
                  </NavLink>
                </Button>
              </FormGroup>
              <Button
                variant="contained"
                color='primary'
                onClick={signInWithGoogle}
                className={classes.form_item}
                aria-labelledby='Continue with Google'
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