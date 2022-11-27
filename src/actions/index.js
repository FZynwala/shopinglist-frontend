import items from '../apis/items';
import { CLEAR_ADD_FLAG, DELETE_ITEM, EDIT_TASK, LOAD_ITEMS, POST_ITEM, SET_ADD_FLAG, SIGN_IN, SIGN_OUT } from './type';

export const fetchItems = () => async (dispatch) => {
    const response = await items.get(`/items`, {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    });
    console.log(response);
    dispatch({
        type: LOAD_ITEMS,
        payload: response.data,
    });
};

export const postItem = (item) => async (dispatch) => {
    const response = await items.post('/items', item, {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    });
    console.log('Payload: ');
    console.log(response);
    dispatch({
        type: POST_ITEM,
        payload: response.data,
    });
};

export const deleteItem = (itemId) => async (dispatch) => {
    const response = await items.delete(`/items/${itemId}`, {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    });

    dispatch({
        type: DELETE_ITEM,
        payload: itemId,
    });
};

export const setAddFlag = () => {
    return {
        type: SET_ADD_FLAG,
    };
};

export const editItem = (item) => async (dispatch) => {
    const response = await items.put(`items/${item._id}`, item, {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    });

    dispatch({
        type: EDIT_TASK,
        payload: item,
    });
};

export const clearAddFlag = () => {
    return {
        type: CLEAR_ADD_FLAG,
    };
};

export const registerUser = (user) => async (dispatch) => {
    const response = await items.post('/users/register', user);

    localStorage.setItem('token', response.headers['x-auth-token']);

    if (localStorage.getItem('token')) {
        dispatch({
            type: SIGN_IN,
        });
    }
};

export const loginUser = (user) => async (dispatch) => {
    const response = await items.post('/users/login', user);

    localStorage.setItem('token', response.headers['x-auth-token']);

    if (localStorage.getItem('token')) {
        dispatch({
            type: SIGN_IN,
        });
    }
};

export const logOutUser = () => async (dispatch) => {
    localStorage.removeItem('token');

    if (!localStorage.getItem('token')) {
        dispatch({
            type: SIGN_OUT,
        });
    }
};

export const setSignInFlag = () => async (dispatch) => {
    if (localStorage.getItem('token')) {
        dispatch({
            type: SIGN_IN,
        });
    }
};

export const setSignOutFlag = () => async (dispatch) => {
    if (!localStorage.getItem('token')) {
        dispatch({
            type: SIGN_OUT,
        });
    }
};
