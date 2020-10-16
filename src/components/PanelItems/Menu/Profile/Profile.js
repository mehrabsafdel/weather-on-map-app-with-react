import React from 'react'
import { connect } from 'react-redux';

const profile = props => {
    return (
        <div>
            <p>!! IMAGE !!</p>
            <p>!! {props.username} !!</p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.userInfo.email,
    };
};


export default connect(mapStateToProps)(profile);