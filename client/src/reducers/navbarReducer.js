import { TOGGLE_NAVBAR } from '../actions/types';
const initialState = {
    navbarClasses: ''
};

export default (state = initialState, action) => {

    switch (action.type) {
        case TOGGLE_NAVBAR: {
            return {
                ...state,
                navbarClasses: state.navbarClasses  ? '' : 'show'
            }
        }
        default:
            return state;
    }
};
