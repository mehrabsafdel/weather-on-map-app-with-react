import React from 'react'
import Classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
const toolbar = (props) => (
    <div className={Classes.Toolbar}>
        <Logo/>
        <div>MENU</div>
        <nav>
            ...
        </nav>
    </div>
);

export default toolbar;