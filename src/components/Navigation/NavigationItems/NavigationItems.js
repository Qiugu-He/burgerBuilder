import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link = "/" exact>MAKE BURGER</NavigationItem>
        {props.isAuthenticated
            ?<NavigationItem link = "/orders">ORDERS</NavigationItem>
            : null}
        {!props.isAuthenticated
            ? <NavigationItem link = "/auth">LOGIN</NavigationItem>
            :<NavigationItem link = "/logout">LOGOUT</NavigationItem>}
    </ul>
);

export default navigationItems;