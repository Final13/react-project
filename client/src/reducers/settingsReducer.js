import {GET_SETTINGS} from '../actions/types';

const initialState = {};

export default (state = initialState, action ) => {
    switch(action.type) {
        case GET_SETTINGS:
            return action.payload;
        default:
            return state;
    }
}