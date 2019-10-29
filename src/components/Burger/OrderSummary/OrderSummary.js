import React from 'react';

import Aux from '../../../hoc/ReactAux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) =>{

    const ingredientsSummary =Object.keys(props.ingredients) //convert to an array
        .map(igKey =>{
        return (
            <li>
                <span style = {{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]} 
            </li> 
            );
        }); 
    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType = "Danger" clicked = {props.purchaseCancelled}>CANCEL</Button>
            <Button btnType = "Success" clicked= {props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;