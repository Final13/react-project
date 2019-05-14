import {GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, SEARCH_PRODUCTS} from '../actions/types';
import State from './state.js'

const initialState = {
    products: [],
    product: State.product(),
};

export default (state = initialState, action ) => {
    switch(action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                product: action.payload
            };
        case SEARCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        default:
            return state;
    }
}