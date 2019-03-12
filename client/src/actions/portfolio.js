import axios from 'axios';
import { GET_ERRORS } from './types';

export const createWork = (work, history) => dispatch => {
    axios.post('/api/works/create', work)
        .then(res => history.push('/portfolio'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getAllWorks = () => dispatch => {
    axios.get('/api/works/get-all')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
