import React from 'react'

import burgerLogo from '../../assets/28.1 burger-logo.png'
import Classes from './Logo.css'
const logo = (props) => (
    <div className={Classes.Logo}>
        <img src={burgerLogo} />
    </div>
)

export default logo;