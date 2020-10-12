import React, {Component} from 'react'
import Login from '../../components/AuthItems/Login/Login'
import Register from '../../components/AuthItems/Register/Register'
import Classes from './Authentication.css'
import { connect } from 'react-redux';
import * as actions from '../../Store/Action/index';
import Spinner from '../../components/UI/Spinner/Spinner'

class authentication extends Component {
    state = {
        registerForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
            },

            gender: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'male', displayValue: 'male' },
                        { value: 'female', displayValue: 'female' }
                    ],
                    placeholder: 'gender'

                },
                value: 'fastest',
            }
        },

        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your mail'
                },
                value: '',
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
            },
        }
    }

    nextStep = () => {
        // const name = {
        //     meh: "saf"
        // }
        // axios.post('/userData.json', name)
        //     .then(Response => console.log(Response))
        //     .catch(error => console.log(error));
         this.props.history.push('/panel');
    }

    loginInputChangeHandler = (event, inputIdentifier) => {
        const updatedLoginForm = {
            ...this.state.loginForm
        };  
        const updatedFormElement = { 
            ...updatedLoginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedLoginForm[inputIdentifier] = updatedFormElement;
        this.setState({ loginForm: updatedLoginForm });
    }

        registerInputChangeHandler = (event, inputIdentifier) => {
            const updatedregisterForm = {
                ...this.state.registerForm
            };
            const updatedFormElement = {
                ...updatedregisterForm[inputIdentifier]
            };
            updatedFormElement.value = event.target.value;
            updatedregisterForm[inputIdentifier] = updatedFormElement;
            this.setState({
                registerForm: updatedregisterForm
            });
        }

    submit = () => {
        console.log("submit")
        this.props.register(this.state.registerForm.email.value,this.state.registerForm.password.value,true)
    }

    login = () => {
        console.log("realY?")
        this.props.login(this.state.loginForm.email.value, this.state.loginForm.password.value,false)
    }

    render() {
        let form = (
            <div className={Classes.main}>
                <Register
                    form={this.state.registerForm}
                    changed={this.registerInputChangeHandler}
                    submit={this.submit}
                />
                <Login
                    form={this.state.loginForm}
                    changed={this.loginInputChangeHandler}
                    login={this.login}
                />
            </div>
        )
        
        if (this.props.loading) {
            form = <Spinner />
        }


        return (
            <div className={Classes.main}>
                {form}
                {/* <NavLink to="/panel" >next step </NavLink> */}
                <button onClick={this.nextStep}>next</button>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        register: (email, password, isSignup) => dispatch(actions.auth(email, password, true)),
        login: (email, password, isSignup) => dispatch(actions.auth(email, password, false)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(authentication);