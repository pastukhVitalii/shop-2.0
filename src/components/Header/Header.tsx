import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {ShoppingCart} from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import './Header.css';
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";

type PropsType = {
    totalPrice: number
}

export const Header = React.memo(function (props: PropsType) {

        const useStyles = makeStyles({
            root: {
                width: '100%',
                height: '100%',
                backgroundColor: 'blanchedalmond'
            },
        });
        const [value, setValue] = React.useState(0);
        const classes = useStyles();

        return (
            <div className='header'>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    color="primary"
                    className={classes.root}
                >
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                    >
                        <NavLink to={'/'}>
                            <BottomNavigationAction label="Main page" icon={<HomeIcon/>} style={{height: '100%'}}/>
                        </NavLink>
                        <div>{props.totalPrice || true}
                            <NavLink to={'/shoppingCart'}>
                                <BottomNavigationAction  label="Shopping Cart" icon={<ShoppingCart/>}/>
                            </NavLink>
                        </div>
                    </Grid>
                </BottomNavigation>
            </div>
        );
    }
)

