import React,{useState} from 'react'
import Profile from './Profile/Profile'
import { NavLink } from 'react-router-dom';
import Sound from './Sound/Sound'
import Classes from './Menu.css'

const menu = props => {


    return (
        <div className={Classes.body}>
            <Profile />
            <NavLink to="/" className={Classes.links} activeClassName={Classes.active} exact>CORONA </NavLink>
            <NavLink to="/panel" className={Classes.links} activeClassName={Classes.active}>WEATHER </NavLink>
            <NavLink to="/manager" className={Classes.links} activeClassName={Classes.active}>MANAGE CITIES</NavLink>
            <Sound />
            {props.children}
        </div>
    )
}

export default menu;