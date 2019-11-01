import React, { Component } from 'react';

import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese:0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-burger-builder-3ec07.firebaseio.com/ingredients.json')
            .then(response =>{
                this.setState({ingredients: response.data});
            })
            .catch(error=>{
                this.setState({error: true})
            });
    }


    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey] //return the numbers of salads, bacon .. from ingredients
            })
            .reduce((sum, el)=>{
                return sum+el;  //el is the number from above return, return sum
            }, 0);

            this.setState({purchasable: sum > 0});
    }
    
    //the type get from BuildControls, will increaes by 1 from that type's "state" !
    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }


    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () =>{
        //alert('Continue !');
        //send request to back end
        this.setState({loading: true});
        //js object
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Bob",
                address: {
                    street: '1 avenue',
                    zipCode: '1234',
                    country: 'Canada'
                },
                email: 'tst@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading:false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    }

    render () {

        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded!</p>: <Spinner />; 
        
        if(this.state.ingredients){ // as ingredients now is dynamically get data from firebase
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled = {disableInfo} 
                        purchasable = {this.state.purchasable}
                        ordered = {this.purchaseHandler}
                        price = {this.state.totalPrice}/> 
                </Aux>
            );

            orderSummary =  <OrderSummary 
                ingredients = {this.state.ingredients}
                price = {this.state.totalPrice }
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

export default withErrorHandler(BurgerBuilder, axios);