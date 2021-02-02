import React from 'react';
import './App.css';
import {Route, NavLink} from 'react-router-dom';
import Login from "../features/Login/Login";
import Register from "../features/Register/Register";

function App3() {
    console.log('render App')
    return (
        <div>
            <Route path='/' render={() => <div>
                <NavLink to={'/login'}> Sign in </NavLink>
                <div>or</div>
                <NavLink to={'/register'}> Sign up </NavLink>
            </div>} exact={true}/>
            <Route path={'/login'} render={() =>
                <Login/>}
            />
            <Route path={'/register'} render={() =>
                <Register/>}
            />

        </div>
    );
}

export default App3;