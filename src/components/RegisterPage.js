import '../style/registerPage.css';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class RegisterPage extends React.Component {
    
    renderInput = ({ input, label, name, id, meta }) => {
        const touched = meta.touched;
        const error = meta.error;;
        console.log(meta);
        return (
            <div className="form-input-material">
                <label htmlFor={name} >{label}</label>
                <input { ...input } autoComplete="off" type="text" name={name} id={id} className={touched && error ? 'invalid' : ''} />
                {this.renderErrorMessage(meta)}
            </div>
        )
    };

    onSubmit = async (formValues) => {
        
    }

    renderErrorMessage = ({ touched, error }) => {
        if(error && touched) {
            return (
                <div className="error-msg-box">
                    {error}
                </div>
            )
        };
    };

    render() {
        return (
            <React.Fragment>
                <div className="icon-container">
                    <i className="icon-basket-alt icon-size" />
                </div>
                <form className="form-container" onSubmit={this.props.handleSubmit(this.onSubmit)} >
                    <h2 className="form-header" >Zarejestruj się</h2>
                    <Field name='name' component={this.renderInput} label="Name" id='name' />
                    <Field name='email' component={this.renderInput} label="Email" id='email' />
                    <Field name='password' component={this.renderInput} label="Password" id='password' />
                    <Field name='confirmPassword' component={this.renderInput} label="Confirm password" id='confirm-password' />
                    <div className="button-container"><button className="button-submit">Zapisz</button></div>
                </form>
            </React.Fragment>
        )
    }
};

const validate = (formValues) => {
    const errors = {};

    if(!formValues.name) errors.name = "Prosze wprowadź imię";
    if(!formValues.email) errors.email = "Prosze wprowadź email";
    if(!formValues.password) errors.password = "Prosze wprowadź hasło";
    if(!formValues.confirmPassword) errors.confirmPassword = "Prosze potwierdź hasło";
    if(formValues.confirmPassword !== formValues.password) errors.confirmPassword = "Hasło sie nie zgadza";

    if(formValues.email) {
        if(!formValues.email.includes('@')) {
            errors.email = "Prosze wprowadź poprawny email";
        }
    }

    return errors;
}

export default reduxForm({
    form: 'regsterUser',
    validate: validate
})(connect(null, {  })(RegisterPage));

