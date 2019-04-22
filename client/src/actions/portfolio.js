import axios from 'axios';
import {GET_ERRORS, GET_ALL_WORKS, GET_WORK_BY_ID, SEARCH_WORKS} from './types';

export const createWork = (work, history) => dispatch => {
    axios.post('/api/works/create', work)
        .then(() => {
            history.push('/portfolio');
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
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
            dispatch({
                type: GET_ALL_WORKS,
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

export const searchWorks = (search) => dispatch => {
    axios.post('/api/works/search', search)
        .then(res => {
            dispatch({
                type: SEARCH_WORKS,
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

export const getWorkById = (id) => dispatch => {
    axios.get(`/api/works/${id}`)
        .then(res => {
            dispatch({
                type: GET_WORK_BY_ID,
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

export const updateWork = (id, work, history) => dispatch => {
    axios.put(`/api/works/edit/${id}`, work)
        .then(() => {
            history.push('/portfolio');
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const deleteWork = (id, history) => dispatch => {
    axios.delete(`/api/works/delete/${id}`)
        .then(res => history.push('/portfolio'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
