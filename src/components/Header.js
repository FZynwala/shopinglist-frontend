import "../style/header.css";
import React from 'react';
import { connect } from 'react-redux';
import { logOutUser } from '../actions';

class Header extends React.Component {
    onClickLogout = () => {
        this.props.logOutUser();
    };

    render() {
        return (
            <React.Fragment>
                <div className="header">
                    Lista zakupów
                </div>
                <div className={this.props.isSignedIn ? 'logout-button' : 'invisible'} onClick={this.onClickLogout} ><i className="icon-logout-1" /></div>
            </React.Fragment>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, { logOutUser })(Header);