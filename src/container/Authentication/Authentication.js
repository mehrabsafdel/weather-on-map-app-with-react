import React, {Component} from 'react'
import Login from '../../components/AuthItems/Login/Login'
import Register from '../../components/AuthItems/Register/Register'
import Classes from './Authentication.css'
import { connect } from 'react-redux';
import * as actions from '../../Store/Action/index';
import Spinner from '../../components/UI/Spinner/Spinner'
import AuthImage from '../../components/UI/Image/AuthImage/AuthImage'

class authentication extends Component {
    state = {
        register: true,
        registerForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
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
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false

            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false

            },
        }
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    loginInputChangeHandler = (event, inputIdentifier) => {
        const updatedLoginForm = {
            ...this.state.loginForm
        };  
        const updatedFormElement = { 
            ...updatedLoginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(event.target.value, this.state.loginForm[inputIdentifier].validation),
        updatedFormElement.touched = true;
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
            updatedFormElement.valid = this.checkValidity(event.target.value, this.state.registerForm[inputIdentifier].validation),
            updatedFormElement.touched = true;
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

    changeform = () => {
        const oldRegister = this.state.register;
        this.setState({register : ! oldRegister})
    }

    render() {
        let form = null;
        if (this.state.register) {
                form = (
            <div className={Classes.main}>
                <Register
                    form={this.state.registerForm}
                    changed={this.registerInputChangeHandler}
                    submit={this.submit}
                    changeform={this.changeform}
                        />
                <AuthImage/>
            </div>
        )
        }
        else {
                    form = (
                        <div className={Classes.main}>
                                            <AuthImage/>

                <Login
                    form={this.state.loginForm}
                    changed={this.loginInputChangeHandler}
                    login={this.login}
                    changeform={this.changeform}

                />
            </div>
        )
        }
        
        if (this.props.loading) {
            form = <Spinner />
        }


        return (
            <div className={Classes.body}>
                <div>
                <p className={Classes.title}>
                    MEHRAB WEATHER APP
                    <br/>this app making by React
                    <br />you can see the source code in my
                    <br />
                    <a className={Classes.link} href='https://github.com/mehrabsafdel/weather-on-map-app-with-react'> Github
                    </a>                    
                    </p>
                    </div>
                {form}
                {/* <NavLink to="/panel" >next step </NavLink> */}
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