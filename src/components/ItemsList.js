import '../style/itemList.css';
import '../fontello/css/fontello.css';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { setAddFlag, clearAddFlag, postItem } from '../actions/index';

class ItemsList extends React.Component {
    renderItems() {
        if(this.props.items) {
            return this.props.items.map( item => {
                return (
                    <li>{item.content}</li>
                );
            });
        }
    };

    onSubmit = async (formValues) => {
        console.log(formValues);
        console.log('hello from onSubmit');
        const body = {
            content: formValues.name1,
            isDone: false,
            userId: 1
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
    };

    renderForm = () => {
        if(this.props.flagAdd.flagAdd) {
            return (
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name='name1' component={this.renderInput} />
                    <button className="button-submit">Dodaj</button>
                </form>
            );
        };


    };

    onClickAddButton = () => {
        this.props.setAddFlag();
    };

    onSubmitButton = () => {
        this.props.clearAddFlag();
    };

    render() {
        return (
            <div>
                <ol className='list'>
                    {this.renderItems()}
                    {this.renderForm()}
                </ol>
                <div>
                    <div onClick={this.onClickAddButton}>
                        <i className="icon-plus-circle add-button" />
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    console.log(state)
    return {
        items: Object.values(state.items),
        flagAdd: state.flagAdd
    };
};

export default reduxForm({
    form: 'newItems'
})(connect(mapStateToProps, { setAddFlag, clearAddFlag, postItem })(ItemsList));
