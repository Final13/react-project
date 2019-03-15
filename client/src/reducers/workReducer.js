import { GET_ALL_WORKS, GET_WORK_BY_ID } from '../actions/types';
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
        default:
            return state;
    }
}