import React, {useCallback, useEffect} from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import {ShoppingCart} from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import {Button, Grid, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../BLL-redux/store";
import firebase from "firebase";
import {logoutTC} from "../../BLL-redux/auth-reducer";

type PropsType = {
  totalPrice: number
}

export const Header = React.memo(function (props: PropsType) {

    const useStyles = makeStyles({
      root: {
        width: '100%',
        height: '60px',
        backgroundColor: 'blanchedalmond',
        marginBottom: '20px'
      },
      btn_header: {
        height: '100%',
      }
    });

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    console.log(isLoggedIn)
    const [userName, setUserName] = React.useState('');

    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user?.uid) {
          const db = firebase.database();
          const name = db.ref(`users/${user?.uid}/`);
          name.on('value', (elem) => {
            let uName = {value: elem.val()};
            console.log(uName.value.firstName)
            setUserName(uName.value.firstName);
          });
        }
      })
    }, [userName, isLoggedIn])
    const logOutCallback = useCallback(() => {
      setUserName('');
      dispatch(logoutTC())
    }, [dispatch]);
    return (
      <div>
        <BottomNavigation
          color="primary"
          className={classes.root}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
          >
            <div>
              <NavLink to={'/'}>
                <IconButton className={classes.btn_header}>
                  <HomeIcon/>
                </IconButton>
              </NavLink>
              {isLoggedIn ? <><Button color="inherit" className={classes.btn_header}
                                      onClick={logOutCallback}>Log out</Button> <span>Hello {userName}</span></>
                :
                <NavLink to={'login'}>
                  <Button color="inherit" className={classes.btn_header}
                          onClick={logOutCallback}>Log in</Button>
                </NavLink>}
            </div>
            <div>
              {props.totalPrice ? <span>{props.totalPrice} $</span> : ''}
              <NavLink to={'/shoppingCart'}>
                <IconButton className={classes.btn_header}>
                  <ShoppingCart/>
                </IconButton>
              </NavLink>
            </div>
          </Grid>
        </BottomNavigation>
      </div>
    );
  }
)

