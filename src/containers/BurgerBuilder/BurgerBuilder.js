import React, { Component } from 'react';

import Aux from '../../ho/Aux';
import Burger from '../../components/Burger/Burger';
class BurgerBuilder extends Component {
    render () {
        return (
            <Aux>
                <Burger />
                <div>Build Contols</div>
            </Aux> 
        );
    }
}

export default BurgerBuilder;