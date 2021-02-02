import React, {useCallback, useEffect, useState} from "react";
import {Input} from "../../components/common/input/Input";
import {Button} from "../../components/common/button/Button";
import firebase from "firebase";
import {NavLink, withRouter} from "react-router-dom";
import '../../../App.scss';

const Register = React.memo((props: any) => {

    console.log('register page');

    useEffect(() => {
        const db = firebase.database();
        console.log(db)
    })

    const [firsName, setFirsName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState(''); //test001@gmail.com
    const [pass, setPass] = useState(''); //test001

    const setFirstNameCallback = useCallback((e) => {
        setFirsName(e.currentTarget.value)
        console.log('name', e.currentTarget.value)
    }, []);

    const setLastNameCallback = useCallback((e) => {
        setLastName(e.currentTarget.value)
    }, []);

    const setEmailCallback = useCallback((e) => {
        setEmail(e.currentTarget.value)
    }, []);
    console.log(email);
    const setPasswordCallback = useCallback((e) => {
        setPass(e.currentTarget.value)
    }, []);

    const signUpCallback = () => {
        const name = {
            firsName,
            lastName,
            time: {
                desktop: 0,
                mobile: 0
            }
        }
        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(res => firebase.database().ref(`users/${firebase.auth().currentUser?.uid}`).set(name))
            .then( res => props.history.replace('/timers'))
            .catch((error: string) => alert(error));
    }

    return (
        <div className={'main'}>
            <div className={'title'}>Register</div>
            <div className={'form'}>
                <Input type={''} placeholder={'First name'} value={firsName} onChange={setFirstNameCallback}/>
                <Input type={''} placeholder={'Last name'} value={lastName} onChange={setLastNameCallback}/>
                <Input type={''} placeholder={'Email'} value={email} onChange={setEmailCallback}/>
                <Input type={''} placeholder={'Password'} value={pass} onChange={setPasswordCallback}/>
            </div>
            <Button type={''} name={'Register'} spinner={false} disable={false} onClick={signUpCallback}/>
            <div className={'secondary_title'}>Already registered? <NavLink className={'link'}
                                                                            to={'/login'}> Log in</NavLink></div>
        </div>
    );
});

export default withRouter(Register);