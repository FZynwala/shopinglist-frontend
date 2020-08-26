import '../style/registerPage.css';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../actions';

class RegisterPage extends React.Component {
    
    renderInput = ({ input, label, name, id, type, meta }) => {
        const touched = meta.touched;
        const error = meta.error;;
        
        return (
            <div className="form-input-material">
                <label htmlFor={name} className="label" >{label}</label>
                <input { ...input } autoComplete="off" type={type} name={name} id={id} className={touched && error ? 'invalid input' : 'input'} />
                {this.renderErrorMessage(meta)}
            </div>
        )
    };

    onSubmit = async (formValues) => {
        console.log(formValues);
        const user = {
            name: formValues.name,
            email: formValues.email,
            password: formValues.password
        };

        await this.props.registerUser(user);
        if(this.props.isSignedIn) {
            this.props.history.push('/');
        }
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

    onClickLinkToLogin = () => {
        this.props.history.push('/login');
    }

    render() {
        if(localStorage.getItem("token")) {
            this.props.history.push('/');
            return <div></div>;
        };

        return (
            <React.Fragment>
                <div className="icon-container">
                    <i className="icon-basket-alt icon-size" />
                </div>
                <form className="form-container" onSubmit={this.props.handleSubmit(this.onSubmit)} >
                    <h2 className="form-header" >Zarejestruj się</h2>
                    <Field name='name' component={this.renderInput} label="Name" id='name' type="text" />
                    <Field name='email' component={this.renderInput} label="Email" id='email' type="text" />
                    <Field name='password' component={this.renderInput} label="Password" id='password' type="password" />
                    <Field name='confirmPassword' component={this.renderInput} label="Confirm password" id='confirm-password' type="password" />
                    <div className="button-container"><button className="button-submit">Zapisz</button></div>
                </form>
                <div className="bottom-link" onClick={this.onClickLinkToLogin}>Masz już konto?<span>Zaloguj się</span></div>
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

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.isSignedIn
    };
};

export default reduxForm({
    form: 'regsterUser',
    validate: validate
})(connect(mapStateToProps, { registerUser })(RegisterPage));

