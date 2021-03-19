import { Button } from "@material-ui/core";
import firebase from "firebase";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { renderTextField } from "../../components/Form/RenderTextField";
import { email, maxLengthCreator, number, required } from "../../components/Form/validators";

const maxLength10 = maxLengthCreator(10);

const RegisterForm = React.memo((props: any) => {

  console.log('register page');

  useEffect(() => {
    const db = firebase.database();
    console.log(db)
  })

  const { handleSubmit } = props

  const handleScroll = (e: any) => {
    alert(e.target)
  }

  return (
    <div className={'main'}>
      <form onSubmit={handleSubmit} onScroll={handleScroll}>
        <Field name="firstName" component={renderTextField} label="First Name"
          validate={[required, maxLength10]} />
        <Field name="lastName" component={renderTextField} label="Last Name"
          validate={[required, maxLength10]} />
        <Field name="email" component={renderTextField} label="Email"
          validate={[required, email]} />
        <Field name="pass" component={renderTextField} label="Password"
          validate={[required, maxLength10, number]} />
        <Button variant="contained" color="primary" type="submit"
          style={{ 'margin': '20px ', 'width': 'calc(100% - 40px)' }}>
          Send
            </Button>
      </form>
    </div>
  );
});

const RegisterReduxForm = reduxForm<RegisterType>({ form: 'Register' })(RegisterForm);

type RegisterType = {
  email: string
  pass: string
  firstName: string
  lastName: string
}


export const Register = React.memo(function (props: any) {

  const onSubmit = (data: RegisterType) => {
    console.log(data);

    firebase.auth().createUserWithEmailAndPassword(data.email, data.pass)
      .then(res => firebase.database().ref(`users/${firebase.auth().currentUser?.uid}`).set(data))
      .then(res => props.history.replace('/shoppingCart'))
      .catch((error: string) => alert(error));
    alert(data.email);
  }

  return (
    <RegisterReduxForm onSubmit={onSubmit} />
  )
});

export default withRouter(Register);