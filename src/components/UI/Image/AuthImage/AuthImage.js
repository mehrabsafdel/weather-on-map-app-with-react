import React from 'react'
import Classes from './AuthImage.css'

const authImage = (props) => {

    return (
        <div className={Classes.main}>
            {props.children}
        </div>
    )
}

export default authImage;