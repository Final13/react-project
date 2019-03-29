import {GET_ALL_BUILDERS} from '../actions/types';

const initialState = {
    builders: [],
};

export default (state = initialState, action ) => {
    switch(action.type) {
        case GET_ALL_BUILDERS:
            return {
                ...state,
                builders: action.payload
            };
        default:
            return state;
    }
}