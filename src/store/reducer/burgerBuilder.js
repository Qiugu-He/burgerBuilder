import * as actionTypes from '../actions/actionTypes';
import  {updateObject} from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese:0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {
                [action.ingredientName]: state.ingredients[action.ingredientName]+1
            };
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients:updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
            return updateObject(state, updatedState);

        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngredient1 = {
                [action.ingredientName]: state.ingredients[action.ingredientName]-1
            };
            const updatedIngredients1 = updateObject(state.ingredients, updatedIngredient1);
            const updatedState1 = {
                ingredients:updatedIngredients1,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
            return updateObject(state, updatedState1);

        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false,
                building: false
            };
            
        case actionTypes.FETCH_INGREDIENTS_FILED:
            return{
                ...state,
                error: true
            };
        default: 
            return state;
    }
};

export default reducer;