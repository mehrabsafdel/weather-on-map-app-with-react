import React from 'react'
import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'
const orderSummery = (props) => {
    const ingridientsSummery = Object.keys(props.ingridients)
        .map(igKey => {
            return <li key={igKey}> {igKey}  : {props.ingridients[igKey]}</li>
        });

    return (
        <Aux>
            <h3>Order Summery</h3>
            <p>a delicios burger with :</p>
            <ul>
                {ingridientsSummery}
            </ul>
            <p>the price is : {props.price.toFixed(2)}</p>
            <p>do you want to continue?</p>
            <Button btnType="Danger" clicked={props.cancelModal}>CANCEL</Button>
            < Button btnType = "Success" > CONTINUE </Button>
        </Aux>
    )
}

export default orderSummery;