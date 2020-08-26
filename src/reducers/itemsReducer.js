import { LOAD_ITEMS, POST_ITEM, DELETE_ITEM, EDIT_TASK, SIGN_OUT } from "../actions/type";
import _ from 'lodash';

export default (state={}, action) => {
    switch (action.type) {
        case LOAD_ITEMS:
            return { ..._.mapKeys(action.payload, '_id') };
        case POST_ITEM:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_ITEM:
            return _.omit(state, action.payload);
        case EDIT_TASK:
            return { ...state, [action.payload._id]: action.payload };
        case SIGN_OUT:
            return {};
        default:
            return state;
    };
};