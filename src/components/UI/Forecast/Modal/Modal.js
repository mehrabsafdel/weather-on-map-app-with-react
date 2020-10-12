import React, { Component } from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import ModalInfo from './ModalInfo/ModalInfo'

class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate () {
        console.log('[Modal] WillUpdate');
    }

    render () {
        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <ModalInfo city={this.props.city} temp={this.props.temp} max={this.props.max}
                        min={this.props.max} forecast={this.props.forecast}></ModalInfo>
                    
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Modal;