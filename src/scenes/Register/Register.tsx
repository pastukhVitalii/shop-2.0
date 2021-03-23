import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  Paper,
  TextField,
} from '@material-ui/core';
import firebase from 'firebase';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setIsLoggedInAC } from '../../BLL-redux/auth-reducer';
import { AppRootStateType } from '../../BLL-redux/store';
import { maxLengthCreator, required } from '../../components/Form/validators';


export const Register = React.memo(() => {
  console.log('register page');

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
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.pass)
        .then(() =>
          firebase
            .database()
            .ref(`users/${firebase.auth().currentUser?.uid}`)
            .set(data),
        )
        .then(() => dispatch(setIsLoggedInAC({ value: true })))
        .catch((error: string) => alert(error));
    },
  });

  const dispatch = useDispatch();

  if (isLoggedIn) {
    return <Redirect to={'/'} />;
  }
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={7}>
        <Paper>
          <form onSubmit={formik.handleSubmit}>
            <FormControl style={{ width: ' 100%' }}>
              <FormGroup>
                <TextField
                  label="First Name"
                  variant={'filled'}
                  {...formik.getFieldProps('firstName')}
                  style={{ margin: '20px ' }}
                />
                {formik.errors.firstName ? (
                  <div>{formik.errors.firstName}</div>
                ) : null}
                <TextField
                  label="Last Name"
                  variant={'filled'}
                  {...formik.getFieldProps('lastName')}
                  style={{ margin: '20px ' }}
                />
                {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
                <TextField
                  label="Email"
                  variant={'filled'}
                  {...formik.getFieldProps('email')}
                  style={{ margin: '20px ' }}
                />
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                <TextField
                  label="Password"
                  variant={'filled'}
                  {...formik.getFieldProps('pass')}
                  style={{ margin: '20px ' }}
                />
                {formik.errors.pass ? <div>{formik.errors.pass}</div> : null}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ margin: '20px ' }}
                >
                  Registered
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
});