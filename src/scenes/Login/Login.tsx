import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import firebase from 'firebase';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import { loginTC, setIsLoggedInAC } from '../../BLL-redux/auth-reducer';
import { AppRootStateType } from '../../BLL-redux/store';
import { maxLengthCreator, required } from '../../components/Form/validators';

export type LoginType = {
  email: string;
  firstName?: string;
  lastName?: string;
  pass: string;
};

export const Login = React.memo(() => {
  console.log('login page');

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
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) =>
        firebase
          .database()
          .ref(`users/${firebase.auth().currentUser?.uid}`)
          .set({firstName: res.user?.displayName?.split(' ')[0],
            lastName: res.user?.displayName?.split(' ')[1],
            email: res.user?.email})
      )
      .then(() => dispatch(setIsLoggedInAC({ value: true })))
      .catch((error) => {
        alert(error.message);
      });
  };

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
                  style={{ margin: '20px ', width: 'calc(100% - 40px)' }}
                >
                  Send
                </Button>
                <Typography align={'center'}>or</Typography>
                <Button
                  variant="contained"
                  color={'primary'}
                  style={{ margin: '20px ', width: 'calc(100% - 40px)' }}
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
                style={{ margin: '20px ', width: 'calc(100% - 40px)' }}
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