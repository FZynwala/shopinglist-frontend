import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import itemsReducer from './itemsReducer';
import flagreducer from './flagreducer';
import authReducer from './authReducer';
import { POST_ITEM } from '../actions/type';

export default combineReducers({
    auth: authReducer,
    items: itemsReducer,
    flagAdd: flagreducer,
    form: formReducer.plugin({
        newItems: (state, action) => { // <------ 'account' is name of form given to reduxForm()
          switch(action.type) {
            case POST_ITEM:
              return undefined;       // <--- blow away form data
            default:
              return state;
          }
        }
      })
});