import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component{
    state = {
        orderForm:{
            name:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your eMail'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                valid: true
            }
        },

        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
         this.setState({loading: true});
        
        const formData ={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        //js object
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading:false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    checkValidity(value, rules){
        let isValiad = true;

        if(rules.required){ 
            isValiad = value.trim() !== '' && isValiad;
        }

        if(rules.minLength){
            isValiad = value.length >= rules.minLength&& isValiad;
        }

        if(rules.maxLength){
            isValiad = value.length <= rules.maxLength&& isValiad;
        }

        return isValiad;
    }

    inputChangedHandler = (event, inputIdentifier)=>{
        const updateOrderForm = {
            ...this.state.orderForm
        };

        const updateFormElement = {
           ...updateOrderForm[inputIdentifier]
        };

        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateOrderForm[inputIdentifier] = updateFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updateOrderForm){
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updateOrderForm, formIsValid:formIsValid});
    }

    render(){

        const formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (                
            <form onSubmit = {this.orderHandler}>
                {formElementsArray.map(formElement=>(
                    <Input 
                        key = {formElement.id}
                        elementType = {formElement.config.elementType}
                        elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value}
                        invalid = {!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed ={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType = "Success" disabled ={!this.state.formIsValid}>ORDER</Button>
             </form>);

        if(this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className = {classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;