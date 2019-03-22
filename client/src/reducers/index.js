import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import navbarReducer from './navbarReducer';
import workReducer from './workReducer';
import contractReducer from './contractReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    nav: navbarReducer,
    work: workReducer,
    contract: contractReducer
});