import React,{useState} from 'react'
import Profile from './Profile/Profile'
import { NavLink } from 'react-router-dom';
import Sound from './Sound/Sound'
import Classes from './Menu.css'

const menu = props => {


    return (
        <div className={Classes.body}>
            <Profile />
            <NavLink to="/">PROFILE </NavLink>
            <NavLink to="/">CORONA </NavLink>
            <NavLink to="/">WEATHER </NavLink>
            <NavLink to="/manager">MANAGE CITIES</NavLink>
            <Sound />
            {/* <label>ADD CITY :</label>
            <input placeholder="ADD CITY" onChange={(event)=> setCity(event.target.value)}></input>
            <button onClick={()=>props.addCity(city)}>ADD CITY</button> */}
            {props.children}
        </div>
    )
}

export default menu;