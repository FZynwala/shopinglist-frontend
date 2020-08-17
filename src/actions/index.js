import { LOAD_ITEMS, SET_ADD_FLAG, CLEAR_ADD_FLAG, POST_ITEM, DELETE_ITEM, EDIT_TASK } from './type';
import items from '../apis/items';

export const fetchItems = (userId) => async (dispatch) => {
    const response = await items.get(`/items/${userId}`);
    console.log(response);
    dispatch({
        type: LOAD_ITEMS,
        payload: response.data
    });
};

export const postItem = (item) => async (dispatch) => {
    const response = await items.post('/items', item);
    console.log('Payload: ')
    console.log(response);
    dispatch({
        type: POST_ITEM,
        payload: response.data
    });
};

export const deleteItem = (itemId) => async (dispatch) => {
    const response = await items.delete(`/items/${itemId}`);

    dispatch({
        type: DELETE_ITEM,
        payload: itemId
    });
};

export const setAddFlag = () => {
    return {
        type: SET_ADD_FLAG
    };
};

export const editItem = (item) => async (dispatch) => {
    const response = await items.put(`items/${item._id}`, item);

    dispatch({
        type: EDIT_TASK,
        payload: item
    });
};

export const clearAddFlag = () => {
    return {
        type: CLEAR_ADD_FLAG
    };
};