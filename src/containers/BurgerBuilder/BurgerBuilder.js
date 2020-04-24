import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false,
    }

    componentDidMount () {
        console.log(this.props);
        this.props.onSetIngredient();
    }

    updatePurchaseState () {
        const sum = Object.keys(this.props.ings)
            .map( igKey => {
                return this.props.ings[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }
        //this is only passing into the URL

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key]= disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}

        let orderSummary = null;


        let burger = this.props.error ? <p> Ingredients can't be loaded </p> : <Spinner />

        if(this.props.ings){
            burger = (
              <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                  ingredientAdded={this.props.onAddIngredient}
                  ingredientRemoved={this.props.onRemoveIngredient}
                  disabled={disabledInfo}
                  purchasable={this.updatePurchaseState()}
                  ordered={this.purchaseHandler}
                  price={this.props.totalP}
                />
              </Aux>
            );
            orderSummary = (<OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.totalP}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}              
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalP: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingType) => dispatch(actions.addIng(ingType)),
        onRemoveIngredient: (ingType) => dispatch(actions.removeIng(ingType)),
        onSetIngredient: () => dispatch(actions.initIng()),
        onPurchaseInit: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));