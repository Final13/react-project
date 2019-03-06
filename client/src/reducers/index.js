import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import navbarReducer from './navbarReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    nav: navbarReducer
});