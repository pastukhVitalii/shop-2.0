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

import { registerGoogleTC, registerTC } from '../../BLL-redux/auth-reducer';
import { AppRootStateType } from '../../BLL-redux/store';
import { maxLengthCreator, required } from '../../utils/validators';
import { useStyles } from '../Login/index';

export const Register = React.memo(() => {
  const classes = useStyles();

  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn,
  );

  const formik = useFormik({
    validate: (values) => {
      if (!values.firstName) {
        return {
          firstName: required(values.firstName),
        };
      } else if (values.firstName.length > 15) {
        return {
          firstName: maxLengthCreator(values.firstName, 15),
        };
      }
      if (!values.lastName) {
        return {
          lastName: required(values.lastName),
        };
      } else if (values.lastName.length > 15) {
        return {
          lastName: maxLengthCreator(values.lastName, 15),
        };
      }
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
      } else if (isNaN(Number(values.pass))) {
        return {
          pass: 'Must be a number',
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
                  label="First Name"
                  variant={'filled'}
                  {...formik.getFieldProps('firstName')}
                  className={classes.form_item}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className={classes.error}>{formik.errors.firstName}</div>
                ) : null}
                <TextField
                  label="Last Name"
                  variant={'filled'}
                  {...formik.getFieldProps('lastName')}
                  className={classes.form_item}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className={classes.error}>{formik.errors.lastName}</div>
                ) : null}
                <TextField
                  label="Email"
                  variant={'filled'}
                  {...formik.getFieldProps('email')}
                  className={classes.form_item}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className={classes.error}>{formik.errors.email}</div>
                ) : null}
                <TextField
                  label="Password"
                  variant={'filled'}
                  {...formik.getFieldProps('pass')}
                  className={classes.form_item}
                />
                {formik.touched.pass && formik.errors.pass ? (
                  <div className={classes.error}>{formik.errors.pass}</div>
                ) : null}
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
                  color={'primary'}
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
