import { LOAD_ITEMS, POST_ITEM, DELETE_ITEM, EDIT_TASK } from "../actions/type";
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
        case EDIT_TASK:
            return { ...state, [action.payload._id]: action.payload };
        default:
            return state;
    };
};