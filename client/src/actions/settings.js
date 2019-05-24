import axios from 'axios';
import {GET_ERRORS, GET_SETTINGS, UPDATE_SETTINGS} from './types';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

export const getCurrency = () => dispatch => {
    axios.post('/api/settings/currency')
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getSettings = () => dispatch => {
    axios.get('/api/settings/get-settings')
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_SETTINGS,
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

export const updateSettings = (settings) => dispatch => {
    axios.put('/api/settings/update', settings)
        .then(res => {
            dispatch({
                type: UPDATE_SETTINGS,
                payload: res.data
            });

            Alert.success('Settings saved!', {
                position: 'top-right',
                effect: 'stackslide',
                offset: 80,
                timeout: 1000
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
