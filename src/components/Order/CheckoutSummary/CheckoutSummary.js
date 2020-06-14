import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';
const checkoutSummary = (props) =>{
    return (
        <div className = {classes.CheckoutSummary}>
            <h1 style = {{fontWeight: 'lighter', fontSize: '25px', textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)'}}> 
                Enjoy your meal</h1>
            <div style = {{width: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>

            <Button 
                btnType = "Danger"
                clicked = {props.checkoutCancelled}>CANCEL</Button>
            <Button 
                btnType = "Success"
                clicked = {props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;