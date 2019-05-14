import axios from 'axios';
import {GET_ERRORS, GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, SEARCH_PRODUCTS} from './types';

export const createProduct = (product, history) => dispatch => {
    axios.post('/api/product/create', product)
        .then(() => {
            history.push('/product');
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

export const getAllProducts = () => dispatch => {
    axios.get('/api/product/get-all')
        .then(res => {
            dispatch({
                type: GET_ALL_PRODUCTS,
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

export const searchProducts = (search) => dispatch => {
    axios.post('/api/product/search', search)
        .then(res => {
            dispatch({
                type: SEARCH_PRODUCTS,
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

export const getProductById = (id) => dispatch => {
    axios.get(`/api/product/${id}`)
        .then(res => {
            dispatch({
                type: GET_PRODUCT_BY_ID,
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

export const updateProduct = (id, product, history) => dispatch => {
    axios.put(`/api/product/edit/${id}`, product)
        .then(() => {
            history.push('/product');
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

export const deleteProduct = (id, history) => dispatch => {
    axios.delete(`/api/product/delete/${id}`)
        .then(res => history.push('/product'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
