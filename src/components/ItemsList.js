import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { clearAddFlag, fetchItems, logOutUser, postItem, setAddFlag } from '../actions/index';
import '../fontello/css/fontello.css';
import '../style/itemList.css';
import Item from './Item';

class ItemsList extends React.Component {
    componentDidMount() {
        this.props.fetchItems();
    }

    renderItems = () => {
        if (this.props.items) {
            return this.props.items.map((item) => {
                return <Item item={item} />;
            });
        }
    };

    onSubmit = async (formValues) => {
        console.log(formValues);
        console.log('hello from onSubmit');
        const body = {
            content: formValues.name1,
            isDone: false,
        };

        await this.props.postItem(body);
        this.props.clearAddFlag();
    };

    renderInput({ input }) {
        return (
            <div>
                <input className="form__field" {...input} />
            </div>
        );
    }

    renderForm = () => {
        if (this.props.flagAdd.flagAdd) {
            return (
                <div className="form-background">
                    <form className="form__group" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <Field name="name1" component={this.renderInput} />
                        <div className="button-container">
                            <button className="button-submit">Dodaj</button>
                        </div>
                    </form>
                </div>
            );
        }
    };

    onClickAddButton = () => {
        this.props.setAddFlag();
    };

    onSubmitButton = () => {
        this.props.clearAddFlag();
    };

    onClickBackground = () => {
        this.props.clearAddFlag();
    };

    render() {
        if (!localStorage.getItem('token')) {
            this.props.history.push('/login');
            return <div></div>;
        }
        return (
            <div>
                <ol className="list">
                    {this.renderItems()}
                    {this.renderForm()}
                </ol>
                <div className={this.props.flagAdd.flagAdd ? 'invisible' : ''}>
                    <div onClick={this.onClickAddButton}>
                        <i className="icon-plus-circle add-button" />
                    </div>
                </div>
                <div
                    onClick={this.onClickBackground}
                    className={this.props.flagAdd.flagAdd ? 'background-modal' : 'invisible'}
                ></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: Object.values(state.items),
        flagAdd: state.flagAdd,
        isSignedIn: state.auth.isSignedIn,
    };
};

export default reduxForm({
    form: 'newItems',
})(connect(mapStateToProps, { setAddFlag, clearAddFlag, postItem, fetchItems, logOutUser })(ItemsList));
