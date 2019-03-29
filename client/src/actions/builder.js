import axios from 'axios';
import {GET_ERRORS, GET_ALL_BUILDERS} from './types';

export const getAllBuilders = () => dispatch => {
    axios.get('/api/builder/get-all')
        .then(res => {
            dispatch({
                type: GET_ALL_BUILDERS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
