import '../style/item.css'
import React from 'react';
import { editItem } from '../actions/index';
import { connect } from 'react-redux';

class Item extends React.Component {
    onClickItem = async () => {
        const editedItem = { ...this.props.item, isDone: !this.props.item.isDone };
        await this.props.editItem(editedItem);
    }

    render() {
        let status = this.props.item.isDone ? 'done' : 'pending';
        return (
            <React.Fragment>
                <li className={`item ${status}`} onClick={this.onClickItem}>
                    {this.props.item.content}
                </li>
            </React.Fragment>
        );
    };
};

export default connect(null, { editItem })(Item);