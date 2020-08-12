import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import ItemsList from './ItemsList';
import { fetchItems } from '../actions';
import Header from './Header';
import "../fontello/css/fontello.css";

class App extends React.Component {
    componentDidMount() {
        this.props.fetchItems(1);
    };

    render() {
        return (
            <div>
                <Header />
                <Router history={history}>
                    <div>
                        <Route path="/" exact component={ItemsList} />
                    </div>
                </Router>
            </div>
        );
    };
}

export default connect(null, { fetchItems })(App);