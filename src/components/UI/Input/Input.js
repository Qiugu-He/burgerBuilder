import React from 'react';
import classes from './Input.css';
const input = (props) =>{
    let inputElement = null;
    switch(props.elementType){
        case('input'):
            inputElement = <input 
                className ={classes.inputElement} 
                {...props.elementConfig} 
                value = {props.value}/>
            break;
        case('textarea'):
            inputElement = <textarea 
                className ={classes.inputElement} 
                {...props.elementConfig} 
                value = {props.value}/>
            break;
        case('select'):
            inputElement = (
            <select 
                className ={classes.inputElement} 
                value = {props.value}>
                {props.elementConfig.options.map(option=>(
                    <option key ={option.value} value = {option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>);
            break;
        default:
            inputElement = <input 
                className ={classes.inputElement} 
                {...props.elementConfig} 
                value = {props.value}/>
    }
    return (
        <div className = {classes.Input}>
            <lable className = {classes.Label}>{props.lable}</lable>
            {inputElement}
        </div>
    );
};

export default input;