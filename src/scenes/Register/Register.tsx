import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  Paper,
  TextField,
} from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { registerGoogleTC, registerTC } from '../../redux/auth-reducer';
import { AppRootStateType } from '../../redux/store';
import {getEmailError, getMaxLengthError, getRequiredError} from '../../utils/validators';
import { useStyles } from '../Login';
import {MAX_FIELD_LENGTH, VALIDATION_ERRORS} from "../../utils/constants";

export const Register = React.memo(() => {
  const classes = useStyles();

  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn,
  );

  const formik = useFormik({
    validate: (values) => {
      if (getRequiredError(values.firstName)) {
        return {
          firstName: VALIDATION_ERRORS.REQUIRED_FIELD,
        };
      } else if (getMaxLengthError(values.firstName, MAX_FIELD_LENGTH)) {
        return {
          firstName: VALIDATION_ERRORS.MAX_LENGTH(MAX_FIELD_LENGTH),
        };
      }
      if (getRequiredError(values.lastName)) {
        return {
          lastName: VALIDATION_ERRORS.REQUIRED_FIELD,
        };
      } else if (getMaxLengthError(values.lastName, MAX_FIELD_LENGTH)) {
        return {
          lastName: VALIDATION_ERRORS.MAX_LENGTH(MAX_FIELD_LENGTH),
        };
      }
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
      firstName: '',
      lastName: '',
      email: '',
      pass: '',
    },

    onSubmit: (data) => {
      dispatch(registerTC(data));
    },
  });

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
                  label="First Name"
                  variant='filled'
                  {...formik.getFieldProps('firstName')}
                  className={classes.form_item}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className={classes.error}>{formik.errors.firstName}</div>
                )}
                <TextField
                  label="Last Name"
                  variant='filled'
                  {...formik.getFieldProps('lastName')}
                  className={classes.form_item}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className={classes.error}>{formik.errors.lastName}</div>
                )}
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
                  aria-labelledby='create account'
                >
                  Create Account
                </Button>
                <Button
                  variant="contained"
                  color='primary'
                  onClick={signInWithGoogle}
                  className={classes.form_item}
                  aria-labelledby='Continue with Google'
                >
                  Continue with Google
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
});
