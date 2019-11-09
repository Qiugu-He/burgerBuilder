import React, { Component } from 'react';

import { connect } from 'react-redux';

import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as BurgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        purchasable: false,
        purchasing: false, //local determine variable
        loading: false,//local determine variable
        error: false//local determine variable
    }

    componentDidMount(){
        // axios.get('https://react-burger-builder-3ec07.firebaseio.com/ingredients.json')
        //     .then(response =>{
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error=>{
        //         this.setState({error: true})
        //     });
    }


    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey] //return the numbers of salads, bacon .. from ingredients
            })
            .reduce((sum, el)=>{
                return sum+el;  //el is the number from above return, return sum
            }, 0);

            return sum > 0;
    }
    
    //the type get from BuildControls, will increaes by 1 from that type's "state" !
    // addIngredientHandler = (type)=>{
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount+1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type)=>{
    //     const oldCount = this.state.ingredients[type];

    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount-1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

    //     this.updatePurchaseState(updatedIngredients);
    // }


    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () =>{
        // //alert('Continue !');
        // //send request to back end
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice)
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?'+queryString
        // });  
        
        //redux
        this.props.history.push('/checkout');
    }

    render () {

        const disableInfo = {
            ...this.props.ings
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded!</p>: <Spinner />; 
        
        if(this.props.ings){ // as ingredients now is dynamically get data from firebase
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls 
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled = {disableInfo} 
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}
                        price = {this.props.price}/> 
                </Aux>
            );

            orderSummary =  <OrderSummary 
                ingredients = {this.props.ings}
                price = {this.props.price }
                purchaseContinued  = {this.purchaseContinueHandler}
                purchaseCancelled = {this.purchaseCancelHandler}/>;
        } 
        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux> 
        );
    }
}

const mapStateToProps = state =>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}
const mapDispactchToProps = dispatch =>{
    return {
        onIngredientAdded: (ingName)=> dispatch(BurgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(BurgerBuilderActions.removeIngredient(ingName))
    }
}

export default connect(mapStateToProps, mapDispactchToProps) (withErrorHandler(BurgerBuilder, axios));