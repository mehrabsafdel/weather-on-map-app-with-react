import React from 'react'
import Classes from './CityBox.css'
import { NavLink } from 'react-router-dom';

const citybox = (props) => {
    return (
        <div className={Classes.box}>
            <p className={Classes.city}>{props.cityName}</p>
            <button className={Classes.rmv} onClick={props.remove}>REMOVE</button>
        </div>
    )
}

export default citybox;