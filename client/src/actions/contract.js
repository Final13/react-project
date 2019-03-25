import axios from 'axios';
import {GET_ERRORS, GET_ALL_CONTRACTS, GET_CONTRACT_BY_ID} from './types';

export const createContract = (contract, history) => dispatch => {
    axios.post('/api/contract/create', contract)
        .then(res => history.push('/contract'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getAllContracts = () => dispatch => {
    axios.get('/api/contract/get-all')
        .then(res => {
            dispatch({
                type: GET_ALL_CONTRACTS,
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

export const getContractById = (id) => dispatch => {
    axios.get(`/api/contract/${id}`)
        .then(res => {
            dispatch({
                type: GET_CONTRACT_BY_ID,
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

export const updateContract = (id, contract, history) => dispatch => {
    axios.put(`/api/contract/edit/${id}`, contract)
        .then(res => history.push('/contract'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const deleteContract = (id, history) => dispatch => {
    axios.put(`/api/contract/delete/${id}`)
        .then(res => history.push('/contract'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
