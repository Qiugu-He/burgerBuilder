import React from 'react';
import Aux from '../../hoc/ReactAux';
import classes from './Layout.css'
const layout = ( props ) => (
    <Aux>
        <div>Toolbar, SiderDrawer, Backdrop</div>
        <main className ={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;