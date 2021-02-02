import React, { useCallback, useState } from "react";
import firebase from "firebase";
import { Redirect, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { renderTextField } from "../../components/Form/RenderTextField";
import { email, maxLengthCreator, number, required } from "../../components/Form/validators";
import { Button } from "@material-ui/core";

const maxLength10 = maxLengthCreator(10);

const LoginForm = React.memo((props: any) => {

	console.log('login page');

	const { handleSubmit } = props

	const handleScroll = (e: any) => {
		alert(e.target)
	}

	return (
		<div className={'main'}>
			<form onSubmit={handleSubmit} onScroll={handleScroll}>
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

const LoginReduxForm = reduxForm<LoginType>({ form: 'login' })(LoginForm);

type LoginType = {
	email: string
	pass: string
}

export const Login = React.memo(function (props: any) {

	const onSubmit = (data: LoginType) => {
		if (firebase.auth().currentUser) {
			firebase.auth().signInWithEmailAndPassword(data.email, data.pass)
				.then(res => props.history.replace("/shoppingCart"))
				.catch(error => alert(error))
		}
	}

	return (
		<LoginReduxForm onSubmit={onSubmit} />
	)
});

export default withRouter(Login);