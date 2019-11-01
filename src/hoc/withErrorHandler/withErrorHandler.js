import React, { Component } from 'react';

import Model from '../../components/UI/Modal/Modal';
import Aux from '../ReactAux';


const withErrorHandler = (WrappedComponet, axios )=>{
    return class extends Component {
        state  = {
            error: null
        }
        componentDidMount(){
            axios.interceptors.request.use(req =>{
                this.setState({error: null});
                return req;
            });

            axios.interceptors.response.use(res => res, error =>{
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () =>{
            this.setState({error: null});
        }


        render (){
            return (
                <Aux>
                    <Model 
                        show = {this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Model>
                    <WrappedComponet {...this.props} />
    
                </Aux>
            );
        }
    }
}

export default withErrorHandler;