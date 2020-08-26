import { SIGN_IN, SIGN_OUT } from "../actions/type";

export default (state={}, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true }
        case SIGN_OUT:
            return { ...state, isSignedIn: false }
        default:
            return state;
    };
};