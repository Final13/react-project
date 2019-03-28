import {GET_ALL_WORKS, GET_WORK_BY_ID, SEARCH_WORKS} from '../actions/types';
import State from './state.js'

const initialState = {
    works: [],
    work: State.work(),
};

export default (state = initialState, action ) => {
    switch(action.type) {
        case GET_ALL_WORKS:
            return {
                ...state,
                works: action.payload
            };
        case GET_WORK_BY_ID:
            return {
                ...state,
                work: action.payload
            };
        case SEARCH_WORKS:
            return {
                ...state,
                works: action.payload
            };
        default:
            return state;
    }
}