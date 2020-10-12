import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'


const INGRIDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon:0.7
}

class BurgerBuilder extends Component{

    state = {
        ingridients : {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchasable: false,
        ordered : false,
    }

    updatePurchasable(copyOfIngridients) {
        let sum = 0;
       for (let key in copyOfIngridients) {
           sum += copyOfIngridients[key];
        }
        
        this.state.purchasable = sum > 0;
    }
    adddIngridient = (type) => {
        // const oldcount = this.state.ingridients[type];
        // oldcount++;
        let newIngridients = {
            ...this.state.ingridients
        };
        newIngridients[type]++;
        let newPrice = this.state.totalPrice;
        newPrice = newPrice + INGRIDIENT_PRICE[type];
        this.setState({totalPrice : newPrice, ingridients : newIngridients})
        this.updatePurchasable(newIngridients);
    }

    removeIngridient = (type) => {
                let newIngridients = {
                    ...this.state.ingridients
                };
                newIngridients[type]--;
                let newPrice = this.state.totalPrice;
                newPrice = newPrice - INGRIDIENT_PRICE[type];
                this.setState({
                    totalPrice: newPrice,
                    ingridients: newIngridients
                })
                this.updatePurchasable(newIngridients);

    }

    orderHandler = () =>{
        this.setState({ ordered: !this.state.ordered });
    }

    render() {
        const disableInfo = {
            ...this.state.ingridients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal
                    show={this.state.ordered}
                    cancelModal = {this.orderHandler}
                >
                    <OrderSummery
                        ingridients={this.state.ingridients}
                        cancelModal={this.orderHandler}
                        price={this.state.totalPrice}

                    />
                </Modal>
                <Burger
                    ingridients={this.state.ingridients}
                />
                <BuildControls
                    Price={this.state.totalPrice}
                    ingridientAdded={this.adddIngridient}
                    ingridientRemoved={this.removeIngridient}
                    disableInfo={disableInfo}
                    ordered = {this.orderHandler}
                    purchasable = {this.state.purchasable}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;