import React from "react";
import Classes from './Register.css'
import Input from '../../UI/Input/Input'

const register = props => {
 const formElementsArray = [];
    for (let key in props.form) {
        formElementsArray.push({
            id: key,
            config: props.form[key]
        });
    }
        let form = (
            <form >
                {formElementsArray.map(formElement => (
                    <Input 
                        label={formElement.config.elementConfig.placeholder}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                         changed={(event) => props.changed(event, formElement.id)} />
                ))}
            </form>
        );
    return (
        <div className={Classes.body}>
            {form}
            <button onClick={props.submit} className={Classes.btn}> register </button>
        </div>
    );
}

export default register;