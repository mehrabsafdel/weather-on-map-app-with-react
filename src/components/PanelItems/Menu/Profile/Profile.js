import React from 'react'
import { connect } from 'react-redux';
import Classes from './Profile.css'

const profile = props => {
    return (
        <div div className = {
            Classes.profile
        } >
            <p>HELLO <br/>{props.username} </p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.userInfo.email,
    };
};


export default connect(mapStateToProps)(profile);