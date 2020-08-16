import { LOAD_ITEMS, POST_ITEM, DELETE_ITEM } from "../actions/type";
import _ from 'lodash';

export default (state={}, action) => {
    console.log(action.payload);
    switch (action.type) {
        case LOAD_ITEMS:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case POST_ITEM:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_ITEM:
            return _.omit(state, action.payload);
        default:
            return state;
    };
};