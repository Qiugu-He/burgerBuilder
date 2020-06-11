import * as actionTypes from './actionTypes';
import axios from '../../axios-orders.js';

export const addIngredient = (name) =>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) =>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) =>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () =>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FILED
    };
}
export const initIngredients = () =>{
    return dispatch => {
        axios.get('https://react-burger-builder-3ec07.firebaseio.com/ingredients.json')
        .then(response =>{
           dispatch(setIngredients(response.data));
        })
        .catch(error=>{
            dispatch(fetchIngredientsFailed());
        });
    };
};