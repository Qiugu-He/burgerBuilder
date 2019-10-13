import React from 'react';

import Aux from '../../../hoc/ReactAux';

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
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    );
};

export default orderSummary;