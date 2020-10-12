import React from 'react'
import Classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },

];
const buildControls = (props) => (
    <div className={Classes.BuildControls} >
        <p>price is : <strong>{props.Price.toFixed(2)}</strong></p>
        {controls.map(ctrl => {
            return <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                type={ctrl.type}
                disableInfo={props.disableInfo[ctrl.type]}
                More={() => props.ingridientAdded(ctrl.type)}
                Less={() => props.ingridientRemoved(ctrl.type)}
            />
        })}
        <button
            className={Classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >ORDER NOW</button>
    </div>
);

export default buildControls;