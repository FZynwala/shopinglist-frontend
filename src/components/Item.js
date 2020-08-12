//import '../style/item.css'
import React from 'react';

class Item extends React.Component {
    render() {
        console.log(this.props.item)
        return (
            <div>
                {this.props.item.content}
            </div>
        );
    };
};

export default Item;