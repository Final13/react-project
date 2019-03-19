import axios from 'axios';
import { GET_ERRORS } from './types';

export const sendMail = (email) => dispatch => {
    axios.post('/api/send-message', email)
        .then(() => {
            console.log('Email send!')
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
