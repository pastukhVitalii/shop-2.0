import React from "react";
import {NavLink, Redirect, withRouter} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {renderTextField} from "../../components/Form/RenderTextField";
import {email, maxLengthCreator, number, required} from "../../components/Form/validators";
import {Button} from "@material-ui/core";
import {AppRootStateType} from "../../BLL-redux/store";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../BLL-redux/auth-reducer";

const maxLength10 = maxLengthCreator(10);

const LoginForm = React.memo((props: any) => {

  console.log('login page');

  const {handleSubmit} = props

  const handleScroll = (e: any) => {
    alert(e.target)
  }

  return (
    <div className={'main'}>
      <form onSubmit={handleSubmit} onScroll={handleScroll}>
        <Field name="email" component={renderTextField} label="Email"
               validate={[required, email]}/>
        <Field name="pass" component={renderTextField} label="Password"
               validate={[required, maxLength10, number]}/>
        <Button variant="contained" color="primary" type="submit"
                style={{'margin': '20px ', 'width': 'calc(100% - 40px)'}}>
          Send
        </Button>
      </form>
    </div>
  );
});

const LoginReduxForm = reduxForm<LoginType>({form: 'login'})(LoginForm);

export type LoginType = {
  email: string
  firstName: string
  lastName: string
  pass: string
}

export const Login = React.memo(function (props: any) {

  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const onSubmit = (data: LoginType) => {
    dispatch(loginTC(data))
  }

  if (isLoggedIn) {
    return <Redirect to={"/"}/>
  }

  console.log(isLoggedIn)
  return (
    <>
      <LoginReduxForm onSubmit={onSubmit}/>
      <div>or</div>
      <NavLink to={'/register'}> Sign up </NavLink>
    </>
  )
});

export default withRouter(Login);