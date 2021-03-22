import { Button } from '@material-ui/core';
import firebase from 'firebase';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { setIsLoggedInAC } from '../../BLL-redux/auth-reducer';
import { AppRootStateType } from '../../BLL-redux/store';
import { renderTextField } from '../../components/Form/RenderTextField';
import {
  email,
  maxLengthCreator,
  number,
  required,
} from '../../components/Form/validators';

const maxLength10 = maxLengthCreator(10);

const RegisterForm = React.memo((props: any) => {
  console.log('register page');

  const { handleSubmit } = props;

  const handleScroll = (e: any) => {
    alert(e.target);
  };

  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn,
  );

  const dispatch = useDispatch();
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => dispatch(setIsLoggedInAC({ value: true })))
      .catch((error) => {
        alert(error.message);
      });
  };

  if (isLoggedIn) {
    return <Redirect to={'/'} />;
  }

  return (
    <div className={'main'}>
      <form onSubmit={handleSubmit} onScroll={handleScroll}>
        <Field
          name="firstName"
          component={renderTextField}
          label="First Name"
          validate={[required, maxLength10]}
        />
        <Field
          name="lastName"
          component={renderTextField}
          label="Last Name"
          validate={[required, maxLength10]}
        />
        <Field
          name="email"
          component={renderTextField}
          label="Email"
          validate={[required, email]}
        />
        <Field
          name="pass"
          component={renderTextField}
          label="Password"
          validate={[required, maxLength10, number]}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: '20px ', width: 'calc(100% - 40px)' }}
        >
          Send
        </Button>
        <Button onClick={signInWithGoogle}>Continue with Google</Button>
      </form>
    </div>
  );
});

const RegisterReduxForm = reduxForm<RegisterType>({ form: 'Register' })(
  RegisterForm,
);

type RegisterType = {
  email: string;
  pass: string;
  firstName: string;
  lastName: string;
};

export const Register = React.memo(function (props: any) {
  const dispatch = useDispatch();

  const onSubmit = (data: RegisterType) => {
    console.log(data);

    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.pass)
      .then((res) =>
        firebase
          .database()
          .ref(`users/${firebase.auth().currentUser?.uid}`)
          .set(data),
      )
      .then((res) => dispatch(setIsLoggedInAC({ value: true })))
      .catch((error: string) => alert(error));
  };

  return <RegisterReduxForm onSubmit={onSubmit} />;
});

export default withRouter(Register);
