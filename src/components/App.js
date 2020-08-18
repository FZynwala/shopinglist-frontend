import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
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
                <HashRouter>
                    <div>
                        <Route path="/" exact component={ItemsList} />
                    </div>
                </HashRouter>
            </div>
        );
    };
}

export default connect(null, { fetchItems })(App);