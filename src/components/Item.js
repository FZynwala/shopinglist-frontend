import '../style/item.css'
import React from 'react';
import { editItem, deleteItem } from '../actions/index';
import { connect } from 'react-redux';

class Item extends React.Component {
    onClickItem = async () => {
        const editedItem = { ...this.props.item, isDone: !this.props.item.isDone };
        await this.props.editItem(editedItem);
    }

    onClickDelete = async (event) => {
        event.stopPropagation();
        await this.props.deleteItem(this.props.item._id);
    }

    render() {
        let status = this.props.item.isDone ? 'done' : 'pending';
        return (
            <React.Fragment>
                <li className={`item ${status}`} onClick={this.onClickItem}>
                    {this.props.item.content}
                    <div onClick={this.onClickDelete} className="button-delete">
                        <i className="icon-cancel-circled" />
                    </div>
                </li>
            </React.Fragment>
        );
    };
};

export default connect(null, { editItem, deleteItem })(Item);