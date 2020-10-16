import React,{useState} from 'react'
import Profile from './Profile/Profile'
import { NavLink } from 'react-router-dom';
import Sound from './Sound/Sound'
import Classes from './Menu.css'


const menu = props => {

    const [menuOpen, setMenuOpen] = useState(false);

    const inputClasses = [Classes.main];
    let elements = null;
    if (menuOpen) {
        inputClasses.push(Classes.menuOpened);
        elements = (
            <div className={Classes.body}>
                <div className={Classes.menu}>
                <Profile />
                <NavLink to="/" className={Classes.links} activeClassName={Classes.active} exact>CORONA </NavLink>
                 <NavLink to="/panel" className={Classes.links} activeClassName={Classes.active}>WEATHER </NavLink>
            <NavLink to="/manager" className={Classes.links} activeClassName={Classes.active}>MANAGE CITIES
            </NavLink>
            <Sound />
        </div>
            <NavLink to="logout" className={Classes.logout}>LOGOUT</NavLink>
                 

                {/* {props.children} */}
            </div>
        )
    }
    else {
        elements = null;
    }
    return (
        <div className = {inputClasses.join(' ')} >
            {!menuOpen && <i class="material-icons" onClick={() => setMenuOpen(true)}><div className={Classes.menuIcon}>menu</div></i>}
            {menuOpen && <i class="material-icons" onClick={() => setMenuOpen(false)}><div className={Classes.menuIcon}>close</div></i>}
            {elements}
        {/* {menuOpen && <div className={Classes.body}>
                <div className={Classes.menu}>
                <Profile />
                <NavLink to="/" className={Classes.links} activeClassName={Classes.active} exact>CORONA </NavLink>
                 <NavLink to="/panel" className={Classes.links} activeClassName={Classes.active}>WEATHER </NavLink>
            <NavLink to="/manager" className={Classes.links} activeClassName={Classes.active}>MANAGE CITIES
            </NavLink>
            <Sound />
        </div>
            <NavLink to="logout" className={Classes.logout}>LOGOUT</NavLink>
                             </div>} */}
        </div>
    )
}

export default menu;