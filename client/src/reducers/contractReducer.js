import {GET_ALL_CONTRACTS, GET_CONTRACT_BY_ID, SEARCH_CONTRACTS} from '../actions/types';
import State from './state.js'

const initialState = {
    contracts: [],
    contract: State.contract(),
};

export default (state = initialState, action ) => {
    switch(action.type) {
        case GET_ALL_CONTRACTS:
            return {
                ...state,
                contracts: action.payload
            };
        case GET_CONTRACT_BY_ID:
            return {
                ...state,
                contract: action.payload
            };
        case SEARCH_CONTRACTS:
            return {
                ...state,
                contracts: action.payload
            };
        default:
            return state;
    }
}