import React, {Component} from 'react';
import Classes from './BurgerIngridients.css'
import PropTypes from 'prop-types'

class BurgurIngridients extends Component {

    render() {
        let ingridients = null;

    switch (this.props.type) {
        case ('bread-bottom'):
            ingridients = <div className={Classes.BreadBottom}></div>
            break;
        case ('bread-top'):
            ingridients = (
                <div className={Classes.BreadTop}>
                    <div className={Classes.Seeds1}></div>
                    <div className={Classes.Seeds2}></div>
                </div>
            )
            break;
        case ('meat'):
            ingridients = <div className={Classes.Meat}></div>
            break;
        case ('cheese'):
            ingridients = <div className={Classes.Cheese}></div>
            break;
        case ('bacon'):
            ingridients = <div className={Classes.Bacon}></div>
            break;
        case ('salad'):
            ingridients = <div className={Classes.Salad}></div>
            break;
        default:
            ingridients = null;
        }
        
        return ingridients;
    }
    
}
BurgurIngridients.PropTypes = {
    type: PropTypes.string.isRequired
}
export default BurgurIngridients;