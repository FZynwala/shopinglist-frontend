import { SET_ADD_FLAG, CLEAR_ADD_FLAG } from "../actions/type";

export default (state={}, action) => {
    switch (action.type) {
        case SET_ADD_FLAG:
            return { ...state, flagAdd: true }
        case CLEAR_ADD_FLAG:
            return { ...state, flagAdd: false }
        default:
            return state;
    }
}