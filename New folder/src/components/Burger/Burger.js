import React from 'react';
import Classes from './Burger.css'
import BurgurIngridients from '../Burger/BurgerIngridients/BurgurIngridients'

const Burger = (props) => {
    let num = 0,i;
    let transformedIngridients = Object.keys(props.ingridients)
        .map(igKey => {
            return [...Array(props.ingridients[igKey])].map((_, i) => {
            return <BurgurIngridients key={igKey + i} type = {igKey}/>
        })
        })
    
    for (i = 0; i < transformedIngridients.length; i++){
        num += transformedIngridients[i].length;
    }
    if (num == 0) {
        transformedIngridients = <p>please add ingridients</p>
    }
    return (
        <div className={Classes.Burger}>
            <BurgurIngridients type="bread-top" />
            {transformedIngridients}
            < BurgurIngridients type = "bread-bottom" />

        </div>
    )
}

export default Burger;