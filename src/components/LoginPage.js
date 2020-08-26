import '../style/registerPage.css';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser, logOutUser } from '../actions';

class LoginPage extends React.Component {
    
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
        const user = {
            name: formValues.name,
            email: formValues.email,
            password: formValues.password
        };

        await this.props.loginUser(user);
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

    onClickLinkToRegister = () => {
        this.props.history.push('/register');
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
                    <h2 className="form-header" >Zaloguj się</h2>
                    <Field name='email' component={this.renderInput} label="Email" id='email' type="text" />
                    <Field name='password' component={this.renderInput} label="Password" id='password' type="password" />
                    <div className="button-container"><button className="button-submit">Zaloguj</button></div>
                </form>
                <div className="bottom-link" onClick={this.onClickLinkToRegister}>Jeśli nie masz konta <span>Zarejestruj się</span></div>
            </React.Fragment>
        )
    }
};

const validate = (formValues) => {
    const errors = {};

    if(!formValues.email) errors.email = "Prosze wprowadź email";
    if(!formValues.password) errors.password = "Prosze wprowadź hasło";

    return errors;
};

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.isSignedIn
    };
};

export default reduxForm({
    form: 'loginUser',
    validate: validate
})(connect(mapStateToProps, { loginUser, logOutUser })(LoginPage));

